# Call Logger

Call Logger is a web app for summarizing meeting notes and call logs. It allows a user
to provide a series of documents, which Call Logger will summarize. Call Logger will
maintain a running list of facts that it will update based on new information from
each document. The user has the option to approve or reject each change, or they can
select an option to automatically approve all changes. I built the user interface using React, Typescript, and Vite. The backend is a Node JS API server that makes a serves of prompts to Chat GPT's API to anlayze the documents. You can check out the app at: https://call-logger.fly.dev/
