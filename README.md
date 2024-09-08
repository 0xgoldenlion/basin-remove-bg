

# Remove Background WebGPU with Basin Integration

A simple React + Vite application for running [MODNet](https://huggingface.co/Xenova/modnet), a tiny portrait background removal model, locally in the browser using Transformers.js, WebGPU-acceleration, and **Basin** to store and retrieve processed images on-chain.

## Getting Started

Follow the steps below to set up and run the application (both frontend and backend).

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- **ADM (Basin)**: Follow the [Basin setup guide](https://textile.notion.site/ETHOnline-Basin-setup-408977b6a8c246a3b3feb1e1766a7e88) to ensure Basin is running and configured on your machine.

### 0. Setup Basin

Ensure that you have **Basin** properly set up by following [this guide](https://textile.notion.site/ETHOnline-Basin-setup-408977b6a8c246a3b3feb1e1766a7e88). Once Basin is running, verify that ADM commands can be executed on your machine.

### 1. Clone the Repository

Clone the repository from GitHub:

```sh
git clone https://github.com/0xgoldenlion/basin-remove-bg.git
```

### 2. Navigate to the Project Directory

Change your working directory to the `basin-remove-bg` folder:

```sh
cd basin-remove-bg
```

### 3. Install Dependencies

Install the necessary dependencies for the frontend using npm:

```sh
npm install
```

### 4. Setup Backend (Node.js) for ADM Integration

We need a backend to handle file uploads and interact with ADM.

#### 4.1. Create a `.env` file

rename the  `template.env` file in the project root to store your environment variables (Network and Private Key for ADM):

In your `.env` file, add the following:

```sh
NETWORK=localnet
PRIVATE_KEY=your_private_key_here
ADMADDRESS=adress_here 
ADMKEY= key_here 
```

Replace `your_private_key_here` with your actual private key for ADM transactions.

#### 4.2. Install Backend Dependencies

Navigate to the `backend` directory and install the necessary backend dependencies:

```sh
cd backend
npm install
```

#### 4.3. Run the Backend Server

Start the backend server, which will handle file uploads and interactions with ADM:

```sh
node server.js
```

The backend server will be running on `http://localhost:5555`.

### 5. Run the Frontend Development Server

Now that the backend is running, return to the main project directory (frontend) and start the development server:

```sh
npm run dev
```

The application should now be running locally. Open your browser and go to `http://localhost:3511` to see it in action.

### 6. Test the Workflow

- **Upload Images**: Drag and drop images into the interface.
- **Process**: Click "Process" to remove the background and upload the image to ADM using the backend.
- **Download**: After processing, you can download the images back from ADM through the backend.

### 7. Additional Notes

- **Basin Integration**: Make sure ADM is set up and running before processing and uploading images. All files are stored on-chain using ADM via Basin.
- **GPU Acceleration**: The application leverages WebGPU for faster processing, but make sure your browser supports WebGPU.

