import { useState } from 'react';
import InfoPageLayout from '../layouts/InfoPageLayout';
import { ChevronDown, Search } from 'lucide-react';

interface HelpProps {
  onNavigate?: (page: string) => void;
}

export default function Help({ onNavigate }: HelpProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'What is arbitrage betting?',
      answer: 'Arbitrage betting (or "arbing") is a strategy that exploits differences in odds across different bookmakers to guarantee a profit regardless of the outcome. By placing bets on all possible outcomes with different bookmakers, you can lock in a profit margin.'
    },
    {
      question: 'How does ArbElite find opportunities?',
      answer: 'Our algorithms continuously scan dozens of bookmakers in real-time, comparing odds across thousands of markets. When we identify a discrepancy large enough to guarantee profit after accounting for commission, we alert you immediately. Most opportunities last only minutes, so speed is essential.'
    },
    {
      question: 'Is arbitrage betting risk-free?',
      answer: 'Arbitrage betting is designed to identify favorable mathematical opportunities, but practical risks always exist: odds can change before you complete all bets, bookmakers may limit your account, and settlement differences can occur. Our platform includes risk management tools to help mitigate these factors. Like any investment strategy, past performance does not guarantee future results, and you should never bet more than you can afford to lose.'
    },
    {
      question: 'Why do bookmakers offer different odds?',
      answer: 'Bookmakers set odds based on their own analysis, risk appetite, and customer base. They also adjust odds to balance their books and manage exposure. These differences create arbitrage opportunities, though they typically close quickly as markets equilibrate.'
    },
    {
      question: 'How much capital do I need to start?',
      answer: 'You can start with as little as $1,000, but more capital allows for better diversification and larger profit margins. We recommend starting with at least $5,000 spread across multiple bookmaker accounts to take advantage of more opportunities and reduce the impact of account limitations.'
    },
    {
      question: 'Will bookmakers ban my account?',
      answer: 'Bookmakers may limit or restrict accounts that consistently profit from arbitrage. To minimize this risk, avoid betting exclusively on arbitrage opportunities, vary your bet sizes, and occasionally place recreational bets. Some bookmakers are more tolerant than others—our platform includes reliability ratings.'
    },
    {
      question: 'How are profits calculated?',
      answer: 'Our calculator shows the guaranteed profit percentage and the exact stakes needed for each outcome. Profit is calculated after accounting for all commissions and fees. For example, a 2% arbitrage opportunity on a $1,000 stake would yield $20 profit regardless of the outcome.'
    },
    {
      question: 'What are the tax implications?',
      answer: 'Tax treatment of gambling income varies by jurisdiction. In the US, gambling winnings are taxable income, while losses may be deductible. We recommend consulting with a tax professional familiar with gambling income in your area. ArbElite can export transaction history to help with record-keeping.'
    },
    {
      question: 'How quickly do I need to act on opportunities?',
      answer: 'Arbitrage opportunities typically last between 30 seconds and 10 minutes. The highest profit margins disappear fastest as other traders identify them or bookmakers adjust odds. Our Pro tier includes instant push notifications to help you act quickly.'
    },
    {
      question: 'Can I use ArbElite API for automation?',
      answer: 'Yes, our Whale tier includes full API access for automated trading. However, be aware that most bookmakers prohibit bot usage, and automated execution carries additional risks. We recommend semi-automated approaches where the system identifies opportunities but you execute manually.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InfoPageLayout
      title="Help Center"
      description="Find answers to common questions about arbitrage trading and ArbElite"
    >
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-600 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden hover:border-orange-600/30 transition-colors"
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-semibold text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                  openFaq === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 text-neutral-300 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400">
            No results found. Try a different search term.
          </p>
        </div>
      )}

      <div className="mt-12 bg-gradient-to-br from-orange-600/10 to-orange-800/10 border border-orange-600/20 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
        <p className="text-neutral-300 leading-relaxed">
          Can't find what you're looking for? Our support team is here to help. Reach out to us anytime at <a href="mailto:info@arbelite.co" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">info@arbelite.co</a>
        </p>
      </div>
    </InfoPageLayout>
  );
}
