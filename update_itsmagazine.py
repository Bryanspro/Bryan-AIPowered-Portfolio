import os

file_path = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Apps\itsmagazine\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Colors & Variables
content = content.replace('--cw-orange: #f36100;', '--cw-gold: #D4AF37;')
content = content.replace('var(--cw-orange)', 'var(--cw-gold)')
content = content.replace('rgba(243, 97, 0,', 'rgba(212, 175, 55,')
content = content.replace('rgba(243,97,0,', 'rgba(212,175,55,')

# 2. Typography
fonts_import = """<link href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">"""
content = content.replace('<link href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&display=swap" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap" rel="stylesheet">', fonts_import)

content = content.replace('font-family: "Oswald", sans-serif;', "font-family: 'Playfair Display', serif;")
content = content.replace("font-family: 'Oswald', sans-serif;", "font-family: 'Playfair Display', serif;")

# 3. Titles and Logos
content = content.replace('<title>Bryan Marquez | CreativeWolf</title>', "<title>Bryan Marquez | IT'S Magazine</title>")
content = content.replace('<meta name="description" content="CreativeWolf AI Developer Presentation">', """<meta name="description" content="IT'S Magazine Digital Concierge">""")

old_logo = """<img src="../../assets/CreartiveWolf/CreativeWolf Logo.jpg" alt="CreativeWolf Logo" style="width: 36px; height: 36px; object-fit: contain; border-radius: 6px;">
                                <span style="white-space:nowrap;">Creative<span style="color: #f36100;">Wolf</span></span>"""
new_logo = """<span style="white-space:nowrap; font-family: 'Playfair Display', serif; letter-spacing: 2px;">IT'S <span style="color: var(--cw-gold);">MAGAZINE</span></span>"""
content = content.replace(old_logo, new_logo)

# 4. Hero Section
content = content.replace('Building Systems That <span>Scale</span>, Not Just Standalone Brands.', 'Curating the Future of <span>Luxury</span> & Culture.')
content = content.replace('Hi, I\'m Bryan. I don\'t just "know AI"—I build real-world, revenue-generating intelligent systems that think, automate, and convert.', "Welcome to IT'S Magazine. We explore the intersection of haute horlogerie, sustainable fashion, zero-emission supercars, and the AI shaping tomorrow.")
content = content.replace('Test the CreativeWolf AI Agent', 'Speak with our Editorial Assistant')
content = content.replace('Watch the Architecture Breakdown', 'Watch the Live Editorial Concept')

# 5. Problem / Solution
content = content.replace('FROM HUSTLE TO LEVERAGE', 'THE CONTENT SATURATION CRISIS')
content = content.replace('<span>The</span> Challenge', '<span>The</span> Noise')
content = content.replace('The industry is saturated. <strong>87% of Realtors</strong> face the "Visibility Crisis," struggling to stand out in a sea of identical branding. Worse, <strong>73% are stuck in the "Hustle Trap,"</strong> chasing leads manually without true leverage.', 'Modern readers are overwhelmed. <strong>87% of digital audiences</strong> face the "Content Saturation Crisis," struggling to find authentic luxury narratives in a sea of clickbait. Worse, <strong>73% of publications</strong> rely on generic coverage without true editorial depth.')
content = content.replace('Standalone brands look nice, but without underlying systems, they fail to generate consistent revenue.', 'Generic articles look nice, but without underlying curation, they fail to build loyal subscriber bases.')
content = content.replace('<span>The</span> Solution', '<span>The</span> Curation')
content = content.replace('<strong>Magnetic Brand Systems</strong> powered by AI. We don\'t just make things look good; we build infrastructure.', '<strong>Editorial Automation</strong> powered by AI. We don\'t just write articles; we craft bespoke reading experiences.')
content = content.replace('By integrating customized LLMs, automated workflows, and CRM routing, we create systems that attract pre-qualified clients and convert them while you sleep.', 'By integrating customized LLMs, personalized content workflows, and AI-driven recommendations, we create digital issues that captivate our affluent demographic.')

# 6. AI Demo
content = content.replace('MEET YOUR NEW LEAD CONVERSION ENGINE: <span style="color: var(--cw-gold);">🐺WOLFAI</span>', 'MEET YOUR DIGITAL CONCIERGE: <span style="color: var(--cw-gold);">✨EDITORIAL ASSISTANT</span>')
content = content.replace('This isn\'t theoretical AI. Below is a custom-built, full-stack AI Assistant designed specifically for CreativeWolf. It pitches your services, captures leads, and routes them directly to a Vercel Postgres database via a Python/FastAPI backend.', "This isn't theoretical AI. Below is a custom-built Editorial Assistant designed specifically for IT'S Magazine. It guides readers to trending articles, recommends premium subscriptions, and facilitates advertising inquiries.")
content = content.replace('🐺', '📖')

# 7. Tech Stack
content = content.replace('PROPRIETARY CAPABILITIES', 'EDITORIAL INFRASTRUCTURE')
content = content.replace('Core Backend', 'Content Delivery')
content = content.replace('Python, FastAPI, REST APIs', 'Python, FastAPI, Headless CMS')
content = content.replace('AI & LLMs', 'AI Curation')
content = content.replace('OpenAI, LangChain, Prompt Engineering, OpenClaw AI', 'Gemini 2.5 Flash, Automated Tagging, Personalization')
content = content.replace('Automation & CRM', 'Subscriber Growth')
content = content.replace('Make.com, Zapier, PostgreSQL, Lead Routing', 'PostgreSQL, Premium Newsletters, Analytics')
content = content.replace('Frontend & UX', 'Digital Experience')

# 8. Add YouTube Live Content Proposal Section
youtube_live_section = """
    <!-- YouTube Live Content Proposal Section -->
    <section id="youtube-proposal" class="video-section" style="background: #151515;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="section-title">
                        <span data-i18n="cwVidTag2">Multimedia</span>
                        <h2 style="color: #fff !important; font-family: 'Playfair Display', serif;" data-i18n="cwVidTitle2">YOUTUBE LIVE CONTENT PROPOSAL</h2>
                    </div>
                    <p style="color: #a9a9a9; font-size: 18px; margin-top: 20px; margin-bottom: 40px;" data-i18n="cwVidP2">
                        Preview our upcoming live editorial coverage and interviews with industry leaders.
                    </p>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <h4 style="color: var(--cw-gold); font-family: 'Playfair Display', serif; margin-bottom: 15px;">Sample 1</h4>
                            <div class="video-container" style="border: 2px solid var(--cw-gold); border-radius: 8px;">
                                <iframe src="https://www.youtube.com/embed/placeholder1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <h4 style="color: var(--cw-gold); font-family: 'Playfair Display', serif; margin-bottom: 15px;">Sample 2</h4>
                            <div class="video-container" style="border: 2px solid var(--cw-gold); border-radius: 8px;">
                                <iframe src="https://www.youtube.com/embed/placeholder2" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <hr class="section-separator">
"""

video_section_target = '<!-- Loom Video Breakdown -->'
content = content.replace(video_section_target, youtube_live_section + '\n    ' + video_section_target)

# 9. Footer
content = content.replace('Ready to add a builder to the <span style="color: var(--cw-gold);">Wolfpack?</span>', """Interested in partnering with <span style="color: var(--cw-gold);">IT'S Magazine?</span>""")
content = content.replace('As an experienced builder with a focus on AI infrastructure, I\'m ready to build the future of proprietary AI alongside your team.', 'As an established digital publication, we are always exploring new frontiers in luxury and technology.')
content = content.replace('7135 State Rd 52 STE 207, Hudson, FL 34667', '123 Luxury Avenue, New York, NY 10012')
content = content.replace('awooo@creativewolf.com', 'partnerships@itsmagazine.com')

# 10. Intents script
content = content.replace('<script src="creativewolf-intents.js"></script>', '<script src="itsmagazine-intents.js"></script>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML update complete.")
