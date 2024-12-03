# Choco-Blogo 🍫✍️

Choco-Blogo is a visually appealing and feature-rich blog management platform. Designed with a user-friendly interface, it provides admins with powerful LLM tools to analyze blog posts and track their performance using insightful metrics like word counts, repetition analysis, and post scores.

## 🔗 Live Demo

# [Visit Choco-Blogo Live](https://choco-blogo.vercel.app/)

### Default Admin Credentials for testing purpose

| **Username**      | **Password** |
| ----------------- | ------------ |
| `blogo@admin.com` | `blogoAdmin` |

---

## 🖼️ Screenshots  

<img width="1470" alt="Screenshot 2024-12-03 at 11 43 13 PM" src="https://github.com/user-attachments/assets/d24265c0-497e-47f2-9916-b08050194a0e">

<img width="1470" alt="Screenshot 2024-12-03 at 11 43 25 PM" src="https://github.com/user-attachments/assets/ad8c7ce7-b11e-4e43-9ab5-02f203257a99">

<img width="1470" alt="Screenshot 2024-12-03 at 11 43 37 PM" src="https://github.com/user-attachments/assets/dfef3dcd-8bb6-4eda-be1c-600ffb8bcd59">


<img width="1470" alt="Screenshot 2024-12-03 at 11 43 47 PM" src="https://github.com/user-attachments/assets/9b4a01d6-4784-4e64-b816-e89daddc4590">





---

## 🚀 Features

- **Post Management**:

  - Admins can view all blog posts.
  - Blog posts are analyzed for word count, unique words, and repetitive content.

- **Post Analysis**:

  - Automatic calculation of content score based on word usage and repetition.
  - Visualization using a bar chart (powered by Chart.js).

- **Secure Admin Access**:

  - Only admins can access the analysis dashboard after proper authentication.

- **Responsive Design**:
  - Optimized for both desktop and mobile users.

---

## 🛠️ Tech Stack

### Frontend:

- **Next.js**: For server-side rendering and client-side interactivity.
- **React**: Component-based UI development.
- **Chart.js**: Interactive visualizations for blog analysis.

### Backend:

- **Next.js API Routes**: For handling backend logic and data analysis.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: For efficient and scalable data storage.

### Styling:

- **Tailwind CSS**: For modern and responsive design.

---

## 📂 Project Structure

```
.
├── pages
│   ├── api
│   │   ├── analyze-posts.ts      # API for analyzing blog posts
│   │   ├── check-session.ts     # API for admin session validation
│   ├── analysis.tsx             # Admin dashboard for analysis
│   ├── index.tsx                # Homepage
├── prisma
│   ├── schema.prisma            # Database schema
├── public                       # Static assets
├── styles                       # Global CSS styles
├── components                   # Reusable components
└── README.md                    # Project documentation
```

---

## 🔧 Setup & Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/BlackHatDevX/choco-blogo.git
   cd choco-blogo
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:

   ```env
   DATABASE_URL=postgres://your-db-user:your-db-password@your-db-host/your-db-name
   ```

4. **Set Up Prisma**:
   Generate the Prisma client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🤝 Contributions

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 👤 Author

**Jash Gro**  
GitHub: [BlackHatDevX](https://github.com/BlackHatDevX)  
Portfolio: [bit.ly/jashgro](https://bit.ly/jashgro)

Feel free to reach out for any queries or suggestions!
