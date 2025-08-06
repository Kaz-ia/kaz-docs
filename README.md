# KazDocs - Intelligent Document Analysis Platform

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/Kaz-ia/kazz-docs)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Build & Deploy](https://github.com/Kaz-ia/kazz-docs/actions/workflows/deploy-to-cloud-run.yml/badge.svg)](https://github.com/Kaz-ia/kazz-docs/actions)

> An intelligent application for extracting, analyzing, and comparing data from business documents like invoices (factures) and quotes (devis). Deployed on Google Cloud Run.

## ✨ Core Features

-   **AI-Powered Data Extraction**: Automatically detects document types and extracts predefined data fields.
-   **Customizable Schemas**: Define your own document categories, types, and the specific data you need to extract.
-   **Document Comparison**: Create custom analysis workspaces to compare fields between different documents (e.g., verify that the `Total Price` on a quote matches the invoice).
-   **Secure Client Folders**: Upload and manage documents in a dedicated, client-specific space.

---

## 🚀 How It Works

The workflow is divided into two main phases: **Data Extraction** and **Data Analysis**.

### 1. Data Extraction Setup

First, you teach KazDocs what to look for.

1.  **Define a Category**: A logical grouping for documents.
    * *Example*: `Billing Documents`
2.  **Define Document Types**: Specify the types of documents within a category.
    * *Example*: `Quote`, `Invoice`, `Purchase Order`
3.  **Define Data Fields**: For each document type, define the specific data points to be extracted by the AI.
    * *Example for a `Quote`*: `[Client Name, Total Price, Issue Date]`
    * *Example for an `Invoice`*: `[Client Name, Total Price, Invoice Number]`
4.  **Upload Documents**: Upload your files (PDF, JPG, etc.) to a client folder. The application automatically processes them, identifies the document type, and extracts the data you defined.

### 2. Document Analysis

Once your data is extracted, you can create workspaces to compare and verify it.

1.  **Create an Analysis Workspace**: Give your analysis a name and select the category of documents you want to work with.
2.  **Define Comparison Rules**: Select a source document type and the fields you want to compare. Then, select the target document type and its corresponding fields.
    * *Example*: Compare the `Total Price` from a `Quote` with the `Total Price` from an `Invoice`.
3.  **Run Analysis**: Navigate to a client's folder, select the analysis function, and choose the workspace you just created. KazDocs will run the comparison and show you the results.

---

## 🛠️ Tech Stack

-   **Backend**: Next.js / 
-   **AI/ML**: Google Document AI / Tesseract.js
-   **Deployment**: Docker, Google Cloud Run
-   **Task Management**: Trello

---

## ⚙️ Getting Started

### Prerequisites

-   Node.js v18+ **or** Python v3.9+
-   Docker Desktop

### Installation & Local Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Kaz-ia/kazz-docs.git](https://github.com/Kaz-ia/kazz-docs.git)
    cd kazz-docs
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    ```sh
    pip install -r requirements.txt
    ```

3.  **Run the application locally:**
    ```sh
    npm start
    ```
    ```sh
    python src/main.py
    ```

---

## 🚀 Deployment

This project is configured for continuous deployment to **Google Cloud Run** using GitHub Actions. Every push or merge to the `main` branch will automatically trigger a build and deploy a new version of the application.

---

## 📈 Project Management

Our team manages tasks, sprints, and the project backlog on our Trello board.

-   **[View our Trello Board](https://trello.com/b/8ZAohWE5/kaz-docs-migration)**

---

## 🤝 Contributing

Contributions from the team are welcome! Please read our [**CONTRIBUTING.md**](/CONTRIBUTING.md) to see how you can get involved, our branching strategy, and our workflow for submitting pull requests.
