import { useState, useEffect, useCallback } from 'react';

export const useArbitrageData = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Load from cache first for instant display
      const cached = localStorage.getItem('cachedMatches');
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (Array.isArray(data) && data.length > 0) {
            setMatches(data);
            setOpportunities(data);
            setLoading(false);
          }
        } catch (e) {
          // Cache corrupted, ignore
        }
      }

      // 2. Request to Backend - GET endpoint (simpler, more reliable)
      const response = await fetch('/api/opportunities');
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      
      // Handle both array and { opportunities: [] } format
      const opportunities_array = Array.isArray(data) ? data : (data?.opportunities || []);
      
      if (Array.isArray(opportunities_array) && opportunities_array.length > 0) {
        setMatches(opportunities_array);
        setOpportunities(opportunities_array);
        localStorage.setItem('cachedMatches', JSON.stringify(opportunities_array));
      }
    } catch (err) {
      console.error('Fetch failed:', err);
      // Fallback: Try loading from cache if server fails
      const cached = localStorage.getItem('cachedMatches');
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (Array.isArray(data)) {
            setMatches(data);
            setOpportunities(data);
          }
        } catch (e) {
          // Ignore cache errors
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 30000); // Refresh every 30s
    return () => clearInterval(timer);
  }, [loadData]);

  return { 
    matches, 
    opportunities,
    loading, 
    refreshData: loadData, 
    usageStats: { requests_remaining: 'Active', limit: 500 }
  };
};
