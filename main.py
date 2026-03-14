import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic import EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
import sqlite3
try:
    import psycopg2
except ImportError:
    psycopg2 = None

# Ensure .env is loaded strictly from the module path
from dotenv import load_dotenv
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)


# 1. Configuración de Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Usamos Flash porque es rapidísimo para chats
model = genai.GenerativeModel('gemini-2.0-flash')

# 2. Inicializamos la app
app = FastAPI(title="Bryan's AI Resume Assistant")

# 3. Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Modelo de Datos
class ChatRequest(BaseModel):
    message: str

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

# 4.5 Database Setup
POSTGRES_URL = os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL")

if not POSTGRES_URL:
    if os.getenv("VERCEL"):
        DB_FILE = '/tmp/portfolio.db'
    else:
        DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'portfolio.db')

def init_db():
    if POSTGRES_URL and psycopg2:
        try:
            conn = psycopg2.connect(POSTGRES_URL)
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS messages (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
            conn.close()
            print("Successfully connected to Postgres database.")
        except Exception as e:
            print(f"Error initializing Postgres: {e}")
    else:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()

init_db()

# 5. El System Prompt Completo (Instrucciones + Personalidad)
SYSTEM_PROMPT = """
Role: You are the official AI Resume Assistant for Bryan Marquez, a Software Engineer transitioning into AI and Python Development. Your goal is to enthusiastically and professionally answer questions from IT recruiters about Bryan's experience, skills, and background.

Tone & Style: Professional, concise, helpful, and tech-savvy. Always keep responses under 3 paragraphs. If asked in Spanish, reply in Spanish. If asked in English, reply in English.

Knowledge Base (Strict Facts Only):
* Current Focus: Python, Generative AI, Process Automation, bridging robust web architecture with AI solutions. Building technology that works smarter and is accessible.
* Experience (12+ Years):
    * Walmart (2024-2025, FL): Handled high-volume POS systems and bilingual tech troubleshooting.
    * Ingeniería de Bombas de Venezuela (2015-2022): Technical Lead & IT Manager. Automated workflows via custom scripts, managed database architecture, and successfully achieved >90% of business goals during a severe industry crisis.
    * Francisco de Miranda Park (2018): Junior Web Developer (HTML/CSS/JS).
* Education & Certifications: 
    * Secured an official US High School Diploma from Penn Foster to seamlessly integrate into the US market.
    * Holds advanced certifications from Outskill (Generative AI Mastermind, Gen AI Engineering Mastermind).
    * Currently completing Google AI Leader and Professional certifications.
* Languages: Fully bilingual (English and Spanish).

Strict Rules:
1. NEVER invent or hallucinate information. If you don't know the answer, say: "I don't have that specific detail, but you can reach out to Bryan directly via the contact form!"
2. Never discuss Bryan's age or personal life outside of professional context.
3. Always frame his transition to the US and into AI as proactive, strategic, and driven by continuous learning.

Personality Module & Cultural Fit (Non-Technical Questions):
If asked about your hobbies, likes, flaws, or fun facts, answer in the first person ("I") with a warm, conversational, and relatable tone. Use the following authorized facts:

* Likes & Hobbies: 
    * Tech & Gaming: I am a massive gamer and tech enthusiast. Beyond playing PC titles like Resident Evil and Elden Ring or diving into mobile games, gaming actively fuels my engineering curiosity. It inspires my passion for UI/UX design, analyzing immersive environments, and brainstorming physics-based game mechanics.
    * Outdoors & Active Lifestyle: I love living in Florida and taking advantage of the weather. You can often find me boating, fishing around the local canals, playing basketball, or kayaking.
    * Animals: I am a huge animal and dog lover. I spend a lot of time dog-sitting and hanging out with my dogs (including Weimaraners and a husky).
    * Travel & Food: I love traveling and soaking in different cultures—whether I'm road-tripping across the US East Coast or spending extended time exploring countries like Spain and Greece. I'm also a huge foodie with a very open palate; I enjoy everything from a quick fast-food run to sitting down for hot pot, seafood, or local gems like Rooster Thai Sushi. At home, I'm a passionate cook who loves carving meats and preparing homemade meals.

* "Flaws" / Areas of Improvement:
    * "Because I am deeply passionate about AI and Evolving System Development, my initial instinct is often to build a custom script or an AI agent from scratch to solve any problem. However, I've learned to balance this 'builder's instinct' by first evaluating if there is an existing, simpler solution available, ensuring I prioritize business deadlines over just writing exciting code."
    * "Coming from a management role outside the US, adapting to the specific corporate culture of the US tech market has been a learning curve, but I am actively overcoming it through constant networking and US-based certifications."

* Fun Facts (Curiosities):
    * I built this very AI bot you are talking to right now to save recruiters time!
    * I sometimes make homemade food as gifts for my friends.
    * I survived and managed operations through severe industry crises, making me extremely resilient under pressure.

Conversation Rule: Always bring the conversation naturally back to how these traits make you a great team player and a creative problem solver.
"""

# 5.5 Mail Configuration
# NOTE: To use this, you need to set up an App Password in your Gmail account
# and add these variables to your .env file:
# MAIL_USERNAME=your_email@gmail.com
# MAIL_PASSWORD=your_app_password
# MAIL_FROM=your_email@gmail.com
# MAIL_PORT=465
# MAIL_SERVER=smtp.gmail.com

MAIL_USERNAME = os.getenv("MAIL_USERNAME", "dummy@example.com")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "dummy")
MAIL_FROM = os.getenv("MAIL_FROM", "dummy@example.com")

conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=465,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

fm = FastMail(conf)

# 6. El Endpoint de Contacto
@app.post("/api/contact")
async def submit_contact(request: ContactRequest):
    try:
        # Save to DB
        if POSTGRES_URL and psycopg2:
            conn = psycopg2.connect(POSTGRES_URL)
            cursor = conn.cursor()
            # Postgres uses %s for placeholders
            cursor.execute(
                "INSERT INTO messages (name, email, message) VALUES (%s, %s, %s)",
                (request.name, request.email, request.message)
            )
            conn.commit()
            conn.close()
        else:
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
                (request.name, request.email, request.message)
            )
            conn.commit()
            conn.close()

        # Send Email Notification
        if MAIL_USERNAME != "dummy@example.com":
            html_content = f"""
            <h3>New Portfolio Contact Form Submission</h3>
            <p><strong>Name:</strong> {request.name}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Message:</strong></p>
            <p>{request.message}</p>
            """
            
            message = MessageSchema(
                subject=f"Portfolio Contact from {request.name}",
                recipients=[MAIL_USERNAME],  # Send to yourself
                body=html_content,
                subtype=MessageType.html
            )
            
            # Send the email asynchronously
            # We don't await this to avoid making the user wait for the email to send
            import asyncio
            asyncio.create_task(fm.send_message(message))

        # Save to readable text file
        if os.getenv("VERCEL"):
            txt_file_path = '/tmp/messages.txt'
        else:
            txt_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'messages.txt')
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(txt_file_path, "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}]\n")
            f.write(f"From: {request.name} <{request.email}>\n")
            f.write(f"Message: {request.message}\n")
            f.write("-" * 50 + "\n\n")

        return {"status": "success", "message": "Message saved and email triggered successfully."}
    except Exception as e:
        import traceback
        print("=== DATABASE/EMAIL ERROR ===")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Error saving message.")

# 7. El Endpoint de Chat
@app.post("/api/chat")
async def chat_with_bryan_bot(request: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="API key is not configured. Please add GEMINI_API_KEY to environment variables.")
    try:
        # Combinamos tu cerebro de instrucciones con la pregunta del reclutador
        prompt_completo = f"{SYSTEM_PROMPT}\n\nUser Question: {request.message}"
        
        response = model.generate_content(prompt_completo)
        
        return {"reply": response.text}
        
    except Exception as e:
        import traceback
        print("=== CHAT API ERROR ===")
        print(f"Error type: {type(e)}")
        print(f"Error string: {str(e)}")
        traceback.print_exc()
        print("======================")
        raise HTTPException(status_code=500, detail="Mi servidor de IA está tomando un breve descanso. ¡Conecta conmigo en LinkedIn!")