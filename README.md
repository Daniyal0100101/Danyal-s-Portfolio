# Personal Portfolio Webpage

This is the source code for Daniyal Asif's personal portfolio webpage, showcasing web development, Python programming, and AI-powered applications.

## Features
- Responsive design for all devices
- Light/Dark theme toggle with local storage persistence
- Interactive projects carousel
- Dynamic typewriter effect on the homepage
- Contact form with EmailJS integration
- Floating shapes with parallax effect on mouse movement
- Skills section with circular progress bars
- Timeline for education and experience

## Project Structure
```
├── index.html          # Main HTML file
├── style.css           # Main stylesheet  
├── script.js           # JavaScript functionality
├── images/             # Images and favicon files
├── .env                # Environment variables for EmailJS
└── .env.example        # Example environment file
```

## Setting Up Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Daniyal0100101/Danyal-s-Portfolio.git
   ```

2. Create a `.env` file in the root directory and add your EmailJS credentials:
   ```
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_USER_ID=your_user_id
   ```

3. Open `index.html` in your browser to view the site.

## EmailJS Setup
To make the contact form work:

1. Create an account on [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template
4. Update the `.env` file with your credentials

## Deployment
The site can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- etc.

## Browser Compatibility
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Contributing
Feel free to submit pull requests or open issues to improve the project.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact Daniyal Asif at dasif1477@gmail.com. 