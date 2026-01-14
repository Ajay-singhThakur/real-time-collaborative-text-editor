Step 1: Planning the Architecture
 Prompt: > "I need to build a real-time collaborative text editor like a lightweight Google Docs. It needs a landing page with a 'Create Document' button, unique URLs for rooms, and no login system. Can you help me plan the frontend and backend?"


How I used it: The AI suggested using React for the UI and Node.js with Socket.io for the backend. This helped me meet the Core Workflow requirement where clicking a button generates a unique URL and lets users join anonymously.


Step 2: Customizing the Rich-Text Features
 Prompt: > "I'm using Quill.js. I need to make sure the toolbar has specific options: font family, size, colors, bold, italic, underline, titles, subtitles, bullet points, and alignment. How do I configure this?"


How I used it: I used the AI's response to build the Document Editor features. This ensured I met every single functional requirement for Typography , Text Styling , and Structure.




Step 3: Handling Real-Time Sync & Chat
 Prompt: > "How do I make it so that when one user types, the other sees it instantly? I also need a sidebar on the right for a live chat between users in the same room."


How I used it: This helped me implement Live Editing and the Chat Sidebar. I learned how to use Socket.io "rooms" to keep the chat and document changes isolated to the correct session.



Step 4: Solving the "State Consistency" Bug
 Prompt: > "I have a problem where formatting resets to default when someone hits 'Enter' or when a remote update arrives. How do I make the styles stay consistent for everyone?"


How I used it: This was the most important part of my Problem Solving. The AI helped me write logic to "lock" the formatting and preserve the cursor position, which kept the State Consistency solid even when multiple people edited at once.