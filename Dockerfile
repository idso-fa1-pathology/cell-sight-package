# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend and frontend directories into the container
COPY backend /app/backend
COPY frontend /app/frontend

# Ensure the uploads directory exists
RUN mkdir -p /app/backend/uploads

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install any needed packages specified in requirements.txt
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variable for Flask
ENV FLASK_ENV=development

# Expose port 5001 for the Flask app
EXPOSE 5001

# Run the Flask application
CMD ["python", "backend/app.py"]
