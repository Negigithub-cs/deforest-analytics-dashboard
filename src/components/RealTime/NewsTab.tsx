
import React from 'react';
import { ExternalLink } from "lucide-react";
import { generateNewsData, NewsItem } from './utils/environmentalDataUtils';

const NewsTab: React.FC = () => {
  const news = generateNewsData();
  
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg">{item.title}</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{item.summary}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{item.source} • {new Date(item.date).toLocaleDateString()}</span>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
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
