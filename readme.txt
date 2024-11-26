Explanation of Data Structure and Uniqueness:
    # Chosen Data Structure
        => Object 
            1. The mapping between short URLs and their corresponding long URLs is stored in an object (urlDataStructure).
            2. This provides constant time complexity O(1)

    # Approach to Ensuring Uniqueness
        => nanoid Library
            1. Generates a random string of a fixed length (SHORT_URL_LENGTH = 6) that has a very low probability of collision.
            2. Before saving a new short URL, the code checks if it already exists in the data structure using getUrl(shortUrl).
            3. If it exists, a new short URL is generated until a unique one is found (5 attempts).

Commands To Run the Project:
    1. Go to project directory as url-shortener
    2. npm install (if node_module missing)
    3. node index.js (start server)
    4. npm test (run test)