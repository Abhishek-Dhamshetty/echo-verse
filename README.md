### steps to create web app

1.design schemas
2.create models
3. implement API CRUD operations
    3.1 Create User/Author
        3.1.1 One can register either Author or User
        3.1.2 Once the user assaigned a role, he cant register for other role with small e-mail
    3.2 Post new Article by author
        3.2.1 Use timestamp as articleId
        3.2.2 Take current date for dateOfCreation & for datOfmodification for an article

    3.3 Edit article by author using authorId
    3.4 Delete/Restore article by author using author id
        3.4.1 Change isArticleActive state to false/true to delete & restore an article
    3.5
        3.5.1 Sort list of articles by date of creation (By student)
        3.5.2 Search for an article by category(By student)
    3.6 User can write comments for articles

4. create Frontend app
5. Identify components and create Root layout
6. Implement Routing
7. Make AJAX calls from components