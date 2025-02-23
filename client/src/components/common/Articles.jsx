import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { 
  ChevronDown, 
  Code, 
  Database, 
  Brain, 
  Clock, 
  User, 
  ChevronRight,
  Search,
  BookOpen
} from 'lucide-react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Articles() {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'AI&ML':
        return <Brain className="w-5 h-5 text-purple-500" />;
      case 'database':
        return <Database className="w-5 h-5 text-blue-500" />;
      case 'programming':
        return <Code className="w-5 h-5 text-emerald-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  const fetchArticles = async (category = '') => {
    try {
      setError('');
      const token = await getToken();
      // console.log("ayyo",BACKEND_URL)
      const url = category
        ? `${BACKEND_URL}/author-api/articles/filter/${category}`
        : `${BACKEND_URL}/author-api/articles`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setError('');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching articles.');
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchArticles(category);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const gotoArticleById = (articleObj) => {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="relative mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <BookOpen className="inline-block mr-3 text-primary-500" />
              Articles Explorer
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></div>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-primary-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full pl-10 pr-8 py-3 bg-black/40 backdrop-blur-sm border border-gray-700 rounded-xl appearance-none text-white transition-all duration-300 hover:border-primary-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">All Categories</option>
              <option value="AI&ML">AI & Machine Learning</option>
              <option value="database">Database</option>
              <option value="programming">Programming</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary-400" />
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-center my-8 p-4 bg-red-900/20 backdrop-blur-sm rounded-xl border border-red-500/20">
            <p className="text-xl text-red-400 animate-pulse">{error}</p>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-16 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
              <Search className="w-16 h-16 text-primary-400 relative animate-pulse" />
            </div>
            <p className="text-center text-lg text-gray-400 animate-fade-in">
              No articles found in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((articleObj, index) => (
              <div
                key={articleObj.articleId}
                className="group relative bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:bg-black/60 hover:border-primary-500/50 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="absolute top-4 right-4">
                  <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 group-hover:border-primary-500/50 transition-all duration-300">
                    {getCategoryIcon(articleObj.category)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-6 space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur group-hover:blur-xl transition-all duration-300"></div>
                      <img
                        src={articleObj.authorData.profileImageUrl}
                        className="relative w-10 h-10 rounded-full border border-gray-700 transition-transform duration-300 group-hover:scale-110"
                        alt={articleObj.authorData.nameOfAuthor}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 flex items-center">
                        <User className="w-4 h-4 mr-1 text-primary-400" />
                        {articleObj.authorData.nameOfAuthor}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1 text-primary-400" />
                        {articleObj.dateOfModification}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white transition-colors duration-300 group-hover:text-primary-400">
                    {articleObj.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {articleObj.content.substring(0, 120) + '...'}
                  </p>
                  
                  <button
                    onClick={() => gotoArticleById(articleObj)}
                    className="flex items-center justify-center w-full px-6 py-3 bg-primary-500/10 text-primary-400 rounded-lg transition-all duration-300 hover:bg-primary-500 hover:text-white group border border-primary-500/20 hover:border-primary-500"
                  >
                    Read Article
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Articles;