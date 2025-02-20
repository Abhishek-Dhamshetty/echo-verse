import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Fetch all articles
  async function getArticles() {
    try {
      const token = await getToken();
      let res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.message === 'articles') {
        const articlesData = res.data.payload;
        setArticles(articlesData);
        setFilteredArticles(articlesData);
        extractCategories(articlesData);
        setError('');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Failed to fetch articles.');
    }
  }

  // Extract unique categories from articles
  function extractCategories(articles) {
    const uniqueCategories = ['All', ...new Set(articles.map(article => article.category))];
    setCategories(uniqueCategories);
  }

  // Navigate to specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  // Handle category change
  function handleCategoryChange(event) {
    const selected = event.target.value;
    setSelectedCategory(selected);
    if (selected === 'All') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.category === selected));
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container">
      {/* Error Message */}
      {error && <p className="display-4 text-center mt-5 text-danger">{error}</p>}

      {/* Category Filter Dropdown */}
      <div className="d-flex justify-content-end mb-3">
        <select className="form-select w-auto" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {filteredArticles.map(articleObj => (
          <div className="col" key={articleObj.articleId}>
            <div className="card h-100">
              <div className="card-body">
                {/* Author Image & Name */}
                <div className="author-details text-end">
                  <img src={articleObj.authorData.profileImageUrl} width="40px" className="rounded-circle" alt="" />
                  <p><small className="text-secondary">{articleObj.authorData.nameOfAuthor}</small></p>
                </div>

                {/* Article Title */}
                <h5 className="card-title">{articleObj.title}</h5>

                {/* Article Content Preview */}
                <p className="card-text">{articleObj.content.substring(0, 80)}...</p>

                {/* Read More Button */}
                <button className="custom-btn btn-4" onClick={() => gotoArticleById(articleObj)}>
                  Read more
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {articleObj.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
