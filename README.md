# 📇 Contact App — Dockerized Node.js + MySQL + AWS Deployment

A simple full-stack **Contact Management App** built with **Node.js**, **Express**, and **MySQL**, containerized using **Docker**, and deployed on **AWS EC2** with an **RDS MySQL Database**.

---

## 🚀 Features

- Add, view, and manage contacts  
- RESTful API with Express.js  
- MySQL database integration  
- Dockerized for easy deployment  
- Hosted on AWS EC2 (backend) and RDS (database)

---

## 🛠️ Tech Stack

| Component | Technology |
|------------|-------------|
| Backend | Node.js, Express.js |
| Database | MySQL (AWS RDS) |
| Deployment | Docker, AWS EC2 |
| Cloud DB | AWS RDS |
| Language | JavaScript |

---

## 📦 Project Structure

```
MYSQL-PROJECT/
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── src/
│   ├── app.js
│   ├── database.js
│   └── routes.js
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

---

## 🧰 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [MySQL Client](https://dev.mysql.com/downloads/)
- AWS EC2 instance (Amazon Linux 2023 recommended)
- AWS RDS MySQL instance

---

## ⚙️ Environment Variables

Create a `.env` file or pass environment variables when running Docker:

| Variable | Description | Example |
|-----------|--------------|----------|
| `DB_HOST` | Database host (RDS endpoint) | `your-rds-endpoint.region.rds.amazonaws.com` |
| `DB_USER` | MySQL username | `your_username` |
| `DB_PASSWORD` | MySQL password | `your_secure_password` |
| `DB_NAME` | Database name | `your_database_name` |

> **⚠️ Security Note:** Never commit your `.env` file or expose credentials in public repositories. Add `.env` to your `.gitignore` file.

---

## 🐳 Docker Setup

### 1️⃣ Pull the Docker image
```bash
docker pull sohampawar1030/mysql-project:latest
```

### 2️⃣ Run the container

```bash
docker run -d -p 80:3000 \
  --name contact-app \
  -e DB_HOST=your-rds-endpoint.region.rds.amazonaws.com \
  -e DB_USER=your_username \
  -e DB_PASSWORD=your_password \
  -e DB_NAME=your_database_name \
  sohampawar1030/mysql-project:latest
```

**Alternative: Using environment file**
```bash
docker run -d -p 80:3000 \
  --name contact-app \
  --env-file .env \
  sohampawar1030/mysql-project:latest
```

### 3️⃣ Check container status

```bash
docker ps
```

### 4️⃣ View logs

```bash
docker logs -f contact-app
```

When successful, you'll see:

```
✅ Database "your_database_name" is ready.
🗂  Using database "your_database_name"
📇 Table "contacts" is ready.
Server is running on http://localhost:3000
```

---

## 🌍 Access the Application

Once your container is running, open:

```
http://<your-ec2-public-ip>/
```

Make sure your EC2 **Security Group** allows inbound traffic on **port 80 (HTTP)**.

---

## 🧾 Checking the Database (RDS)

To verify your data on RDS:

```bash
mysql -h your-rds-endpoint.region.rds.amazonaws.com -u your_username -p
```

Then:

```sql
SHOW DATABASES;
USE your_database_name;
SHOW TABLES;
SELECT * FROM contacts;
```

---

## ☁️ AWS Setup Summary

1. **Create EC2 Instance** (Amazon Linux 2023)
2. **Install Docker**

   ```bash
   sudo dnf install docker -y
   sudo systemctl enable docker
   sudo systemctl start docker
   ```
3. **Create RDS MySQL Instance**

   * Publicly accessible: **Yes** (or configure VPC peering)
   * Security Group: same VPC as EC2
   * Port 3306 open to EC2 security group
4. **Run Docker container with environment variables**
5. **Access app via EC2 public IP**

---

## 🔒 Security Best Practices

- **Never hardcode credentials** in your source code or README
- Use **AWS Secrets Manager** or **Parameter Store** for production
- Add `.env` to `.gitignore`
- Use **IAM roles** for EC2 to RDS authentication when possible
- Restrict RDS security group to only allow EC2 instance access
- Enable **SSL/TLS** for RDS connections in production

---

## 🧹 Useful Commands

| Command                            | Description               |
| ---------------------------------- | ------------------------- |
| `docker ps`                        | List running containers   |
| `docker stop contact-app`          | Stop the app              |
| `docker rm contact-app`            | Remove the container      |
| `docker logs contact-app`          | View container logs       |
| `docker exec -it contact-app bash` | Enter the container shell |

---

## 💡 Troubleshooting

**Database Connection Error:**

* Check RDS security group allows inbound traffic from EC2 (port 3306)
* Verify DB credentials (username/password)
* Make sure `DB_HOST` matches your RDS endpoint
* Test connection from EC2: `telnet your-rds-endpoint 3306`

**Port already in use:**

```bash
sudo lsof -i :80
sudo docker stop <container-id>
```

**Container exits immediately:**

```bash
docker logs contact-app
```
Check for environment variable errors or database connection issues.

---

## 👨‍💻 Author

**Soham Pawar**  
🚀 GitHub: [@sohampawar1030](https://github.com/sohampawar7030)  
💬 Email: sohampawar7030@gmail.com

---

## 📄 License

**MIT Software License**

All rights reserved.

Copyright (c) 2025 MIT.

This software and associated documentation files are the property of MIT.

No part of this software may be copied, modified, distributed, or used without explicit permission from VidzAl.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
