import React, { useState, useEffect } from 'react';
import { ExternalLink } from "lucide-react";
import { fetchNewsData, NewsItem } from 'src/components/RealTime/utils/environmentalDataUtils';

interface NewsTabProps {
  stateId: string; 
}

const NewsTab: React.FC<NewsTabProps> = ({ stateId }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null); 
      try {
       
        const query = 'climate change OR environment OR pollution OR conservation OR deforestation OR flood OR drought OR heatwave';
        const countryCode = stateId === 'IN' ? 'in' : null; 
        const fetchedNews = await fetchNewsData(query, countryCode);
        setNews(fetchedNews);
      } catch (err: any) {
        console.error("Error fetching news in NewsTab:", err);
        setError(err.message || 'Failed to load news. Please check your internet connection or API key.');
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [stateId]); 
  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading the latest environmental news...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600 font-medium">Error: {error}</div>;
  }

  if (news.length === 0) {
    return <div className="text-center py-8 text-gray-600">No recent environmental news found for this selection.</div>;
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg text-gray-900">{item.title}</h3>
            {}
            {item.category && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full whitespace-nowrap">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            )}
          </div>
          <p className="text-gray-700 mb-3 text-sm leading-relaxed">{item.summary}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">{item.source} • {new Date(item.date).toLocaleDateString()}</span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 transition-colors font-medium"
            >
              Read More <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsTab;