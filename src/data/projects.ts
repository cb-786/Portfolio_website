export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  tags: string[];
  techStack: string[];
  category: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  challenges: string[];
  metrics: {
    value: string;
    label: string;
    description?: string;
  }[];
  implementation: {
    approach: string;
    technologies: {
      name: string;
      reason: string;
    }[];
  };
  architecture?: string;
  // documentation may include setup, usage, api, contributing, and other free-form notes
  documentation: Record<string, any>;
  // repository metadata / notes — allow flexible shape since different projects provide different fields
  repoNotes?: Record<string, any>;
}

export const projectsData: Project[] = [
  {
    id: "stock-trading-platform",
    title: "Full-Stack Stock Trading Platform",
    description: "A responsive trading platform featuring real-time market watchlists and portfolio analytics.",
    fullDescription: "Built a responsive trading platform using React and Bootstrap. Engineered a RESTful API backend with Node.js/Express.js implementing secure authentication. Designed MongoDB schemas for user data and implemented CRUD operations with visualizations for portfolio analytics.",
    image: "/projects/ss_1.png",
    images: [
      "/projects/ss_1.png",
      "/projects/holdings.png"
    ],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Bootstrap", "Chart.js", "bcryptjs", "JWT"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/cb-786/full_stack_major_project-Stock-trading-platform",
    features: [
      "Real-time market watchlists and portfolio views",
      "RESTful API backend with secure authentication",
      "CRUD operations for user data management",
      "Portfolio analytics using Chart.js visualizations",
      "Responsive design for mobile and desktop",
      "User-friendly dashboard interface"
    ],
    challenges: [
      "Managing real-time data synchronization between frontend and backend while maintaining performance",
      "Implementing secure JWT-based authentication with bcryptjs for password hashing",
      "Handling complex state management in React for multiple watchlists and portfolio updates",
      "Optimizing database queries for efficient portfolio calculations with large datasets"
    ],
    metrics: [
      {
        value: "3",
        label: "Core Technologies",
        description: "Frontend (React), Backend (Node.js/Express), Database (MongoDB)"
      },
      {
        value: "100%",
        label: "CRUD Operations",
        description: "Full Create, Read, Update, Delete functionality implemented"
      },
      {
        value: "RESTful",
        label: "API Architecture",
        description: "Scalable REST API design for future expansion"
      },
      {
        value: "JWT",
        label: "Authentication Method",
        description: "Secure token-based authentication system"
      }
    ],
    implementation: {
      approach: "The platform uses a three-tier MERN stack architecture. React handles the interactive frontend with real-time updates, Express.js provides a scalable RESTful API backend, and MongoDB stores user profiles, watchlists, and trading data. JWT authentication ensures secure user sessions with bcryptjs password encryption.",
      technologies: [
        {
          name: "React",
          reason: "Dynamic UI components for real-time watchlists and portfolio analytics with smooth state management"
        },
        {
          name: "Node.js + Express.js",
          reason: "Fast, non-blocking backend perfect for handling multiple concurrent user requests and real-time updates"
        },
        {
          name: "MongoDB",
          reason: "Flexible document-based storage for user data, watchlists, and trading history with easy scalability"
        },
        {
          name: "Chart.js",
          reason: "Rich visualization library for portfolio performance charts and market trend analysis"
        }
      ]
    },
    architecture: `React Frontend (UI Components)
        ↓
REST API (Express.js)
        ↓
MongoDB (User Data, Watchlists, Trading Records)
        ↓
Authentication Layer (JWT + bcryptjs)`,
    documentation: {
      setup: `# Clone the repository
git clone https://github.com/cb-786/full_stack_major_project-Stock-trading-platform
cd full_stack_major_project-Stock-trading-platform

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Add MongoDB connection string, JWT secret, etc.

# Run the application
npm start`,
      usage: `Users can create accounts, add stocks to their watchlist, view real-time market data, and track their portfolio performance through an intuitive dashboard interface.`,
      api: `POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/watchlist - Fetch user's watchlist
POST /api/watchlist - Add stock to watchlist
DELETE /api/watchlist/:id - Remove from watchlist
GET /api/portfolio - Get portfolio analytics`
    }
  },
  {
    id: "eeg-signal-classification",
    title: "EEG Signal Classification Pipeline",
    description: "A machine learning pipeline for ADHD detection using EEG signal analysis achieving 95.83% accuracy.",
    fullDescription: "Developed an ML pipeline using EEG signals from 121 children. Extracted 760 features across 19 EEG channels (time-domain, frequency-domain, morphological). Implemented KNN feature selection and evaluated 4 ML models (GPC, Random Forest, SVM, MLP).",
    image: "/projects/eeg_1.png",
    images: [
      "/projects/eeg_1.png",
    ],
    tags: ["Python", "NumPy", "Pandas", "Scikit-learn", "Signal Processing"],
    techStack: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "SciPy", "MLP", "Random Forest", "SVM"],
    category: "ai-ml",
    featured: true,
    githubUrl: "https://github.com/cb-786/ADHD_Detection_using_EEG_signals",
    features: [
      "Analysis of EEG signals from 121 children",
      "Extraction of 760 features across 19 EEG channels",
      "Time-domain, frequency-domain, and morphological feature extraction",
      "KNN-based feature selection for dimensionality reduction",
      "High accuracy (95.83%) using ensemble and single models",
      "Comprehensive performance metrics and confusion matrices"
    ],
    challenges: [
      "Extracting meaningful features from noisy EEG signals while preserving clinical relevance",
      "Managing high-dimensional feature space (760 features) with limited samples (121 children) to prevent overfitting",
      "Implementing and tuning KNN feature selection for optimal feature subset without losing discriminative power",
      "Handling class imbalance and ensuring model generalization across different EEG protocols and equipment"
    ],
    metrics: [
      {
        value: "99.23%",
        label: "Best Model Accuracy",
        description: "Achieved by RBF-SVM classifier on validation set"
      },
      {
        value: "760",
        label: "Features Extracted",
        description: "Time-domain, frequency-domain, and morphological features"
      },
      {
        value: "19",
        label: "EEG Channels Analyzed",
        description: "Multi-channel comprehensive signal analysis"
      },
      {
        value: "121",
        label: "Subjects in Dataset",
        description: "Children analyzed for ADHD detection"
      }
    ],
    implementation: {
      approach: "The pipeline preprocesses EEG signals using SciPy for filtering and normalization. Feature extraction applies time-domain (statistical), frequency-domain (FFT), and morphological techniques across all 19 channels. KNN feature selection identifies the most discriminative 100-150 features from the initial 760. Four classifiers (GPC, Random Forest, SVM, MLP) are trained and compared using cross-validation and confusion matrices.",
      technologies: [
        {
          name: "Python",
          reason: "Ideal for data science with rich ecosystem of signal processing and ML libraries"
        },
        {
          name: "NumPy & Pandas",
          reason: "Efficient numerical operations and data manipulation for handling multi-channel EEG data"
        },
        {
          name: "Scikit-learn",
          reason: "Comprehensive ML library for feature selection, model training, and evaluation metrics"
        },
        {
          name: "SciPy",
          reason: "Signal processing capabilities for EEG filtering, FFT, and morphological operations"
        }
      ]
    },
    architecture: `Raw EEG Signals (19 channels × 121 subjects)
        ↓
Signal Preprocessing (Filtering, Normalization)
        ↓
Feature Extraction (760 features: time, frequency, morphological)
        ↓
KNN Feature Selection (dimensionality reduction to ~100-150 features)
        ↓
Model Training (GPC, Random Forest, SVM, MLP)
        ↓
Cross-Validation & Performance Evaluation (Confusion Matrices, Accuracy: 95.83%)`,
    documentation: {
      setup: `# Clone the repository
git clone https://github.com/cb-786/ADHD_Detection_using_EEG_signals
cd ADHD_Detection_using_EEG_signals

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Run the pipeline
python main.py`,
      usage: `The script loads EEG data, performs feature extraction, applies KNN selection, trains multiple models, and generates performance reports with confusion matrices for each classifier.`,
      notes: `The best model achieves 95.83% accuracy. Detailed confusion matrices and per-model metrics are saved in the outputs directory.`
    }
  },
];
