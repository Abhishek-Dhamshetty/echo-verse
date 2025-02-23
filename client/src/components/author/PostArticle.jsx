import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { userAutherContextObj } from '../../contexts/userAutherContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Pencil, List, FileText, Send } from 'lucide-react'

function PostArticle() {
  const { register, handleSubmit } = useForm()
  const { currentUser } = useContext(userAutherContextObj)
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  async function postArticle(articleObj) {
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    }
    articleObj.authorData = authorData
    articleObj.articleId = Date.now()

    let currentDate = new Date()
    articleObj.dateOfCreation =
      currentDate.getDate() +
      '-' +
      currentDate.getMonth() +
      '-' +
      currentDate.getFullYear() +
      ' ' +
      currentDate.toLocaleTimeString('en-US', { hour12: true })

    articleObj.dateOfModification = articleObj.dateOfCreation
    articleObj.comments = []
    articleObj.isArticleActive = true

    let res = await axios.post(`${BACKEND_URL}/author-api/article`, articleObj)
    if (res.status === 201) {
      navigate(`/author-profile/${currentUser.email}/articles`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="border-b border-gray-700">
            <h2 className="text-3xl font-bold text-amber-500 text-center py-6 flex items-center justify-center gap-2">
              <Pencil size={28} />
              Write an Article
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit(postArticle)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="title" className="block text-gray-300 mb-2 flex items-center gap-2">
                  <FileText size={20} />
                  Title
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  id="title"
                  {...register('title')}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="category"
                  className="block text-gray-300 mb-2 flex items-center gap-2"
                >
                  <List size={20} />
                  Select a category
                </label>
                <select
                  {...register('category')}
                  id="category"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  defaultValue=""
                >
                  <option value="" disabled>
                    --categories--
                  </option>
                  <option value="programming">Programming</option>
                  <option value="AI&ML">AI&ML</option>
                  <option value="database">Database</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="content"
                  className="block text-gray-300 mb-2 flex items-center gap-2"
                >
                  <FileText size={20} />
                  Content
                </label>
                <textarea
                  {...register('content')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 min-h-[200px]"
                  id="content"
                  rows="10"
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end"
              >
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-2 rounded-lg transform hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Post
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PostArticle