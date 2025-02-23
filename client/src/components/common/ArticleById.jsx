import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { userAutherContextObj } from '../../contexts/userAutherContext'
import { MdDelete, MdRestore } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { FaEdit, FaSave, FaCommentAlt, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { FaCalendarAlt } from 'react-icons/fa';
function ArticleByID() {
  const { state } = useLocation()
  const { currentUser } = useContext(userAutherContextObj)
  const [editArticleStatus, setEditArticleStatus] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const [currentArticle, setCurrentArticle] = useState(state)
  const [commentStatus, setCommentStatus] = useState('')
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Original functions remain unchanged
  function enableEdit() {
    setEditArticleStatus(true)
  }

  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...currentArticle, ...modifiedArticle }
    const token = await getToken()
    const currentDate = new Date();
    articleAfterChanges.dateOfModification = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()

    let res = await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    if (res.data.message === 'article modified') {
      setEditArticleStatus(false);
      setCurrentArticle(res.data.payload)
      navigate(`/author-profile/articles/${currentArticle.articleId}`, { state: res.data.payload })
    }
  }

  async function addComment(commentObj) {
    commentObj.nameOfUser = currentUser.firstName;
    let res = await axios.put(`http://localhost:3000/user-api/comment/${currentArticle.articleId}`, commentObj);
    if (res.data.message === 'Comment added') {
      setCommentStatus(res.data.message)
      setCurrentArticle(res.data.payload)
      reset();
    }
  }

  async function deleteArticle() {
    const articleToUpdate = { ...currentArticle, isArticleActive: false };
    let res = await axios.put(`http://localhost:3000/author-api/articles/${currentArticle.articleId}`, articleToUpdate)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }

  async function restoreArticle() {
    const articleToUpdate = { ...currentArticle, isArticleActive: true };
    let res = await axios.put(`http://localhost:3000/author-api/articles/${currentArticle.articleId}`, articleToUpdate)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-gray-100 min-h-screen transition-all duration-300 ease-in-out overflow-hidden">
      {editArticleStatus === false ? (
        <div className="space-y-8 animate-fadeIn">
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white transition-all duration-300 hover:text-blue-400">
                  {currentArticle.title}
                </h1>
                <div className="space-x-4 text-sm text-gray-400">
                <FaCalendarAlt className="text-blue-400" />
                  <span>Created on: {currentArticle.dateOfCreation}</span>
                  <FaCalendarAlt className="text-yellow-400" />
                  <span>Modified on: {currentArticle.dateOfModification}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center transition-transform duration-300 hover:scale-105">
                  <img
                    src={currentArticle.authorData.profileImageUrl}
                    className="w-16 h-16 rounded-full border-2 border-blue-400"
                    alt={currentArticle.authorData.nameOfAuthor}
                  />
                  <p className="mt-2 text-sm font-medium">{currentArticle.authorData.nameOfAuthor}</p>
                </div>
                {currentUser.role === 'author' && (
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                      onClick={enableEdit}
                    >
                      <FaEdit className="text-yellow-400 text-xl" />
                    </button>
                    {currentArticle.isArticleActive ? (
                      <button
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                        onClick={deleteArticle}
                      >
                        <MdDelete className="text-red-400 text-xl" />
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                        onClick={restoreArticle}
                      >
                        <MdRestore className="text-blue-400 text-xl" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {currentArticle.content}
            </p>
          </div>

          <div className="mt-12 space-y-6">
          <FaCommentAlt className="text-blue-400" />
            <h2 className="text-2xl font-bold">Comments</h2>
            <div className="space-y-4">
              {currentArticle.comments.length === 0 ? (
                <p className="text-xl text-gray-400">No comments yet...</p>
              ) : (
                currentArticle.comments.map(commentObj => (
                  <div
                    key={commentObj._id}
                    className="bg-gray-800 p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <p className="font-medium text-blue-400">{commentObj?.nameOfUser}</p>
                    <p className="mt-2 text-gray-300">{commentObj?.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {commentStatus && (
            <div className="text-green-400 mt-4 animate-fadeIn">{commentStatus}</div>
          )}

          {currentUser.role === 'user' && (
            <form onSubmit={handleSubmit(addComment)} className="mt-8 space-y-4">
              <input
                type="text"
                {...register("comment")}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Add a comment..."
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 mt-4">
              <FaCommentAlt />
                Add Comment
              </button>
            </form>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSave)} className="space-y-6 animate-fadeIn">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              defaultValue={currentArticle.title}
              {...register("title")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              {...register("category")}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              defaultValue={currentArticle.category}
            >
              <option value="programming">Programming</option>
              <option value="AI&ML">AI&ML</option>
              <option value="database">Database</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              {...register("content")}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              rows="10"
              defaultValue={currentArticle.content}
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ArticleByID

