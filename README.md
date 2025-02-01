# Wedding Invitation Generator

A simple Express.js web application that allows users to create and view personalized wedding invitations. The app lets couples upload pre-wedding photos and choose a design for their wedding invitation. The invitations are stored and can be accessed via a unique URL.

## Features
- **Form to input wedding details:** Users can fill in details such as couple's name, wedding date, time, location, RSVP date, and upload pre-wedding photos.
- **Dynamic URL Generation:** Each wedding invitation is given a unique URL based on the couple's name.
- **Photo Uploads:** Users can upload up to 7 photos for the wedding invitation.
- **Customizable Designs:** Users can select from two designs for the invitation (minimalist or classic).
- **Admin Panel:** Admins can view a list of all created invitations and access each one through its unique URL.

## Dependencies
- `express`: Web framework for Node.js.
- `multer`: Middleware for handling file uploads.
- `path`: Utilities for working with file and directory paths.
- `fs`: Node.js file system module for reading files.

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create the required directories
Make sure to create a directory to store uploaded photos:
```bash
mkdir -p public/uploads
```

### 4. Create your templates
The `design` folder should contain two HTML templates for the wedding invitation:
- `design-1.html` (classic design)
- `design-2.html` (minimalist design)

### 5. Start the server
```bash
npm start
```
The server will run at [http://localhost:3000](http://localhost:3000).

### 6. Accessing the app
- Go to [http://localhost:3000](http://localhost:3000) to fill out the wedding invitation form.
- After submission, you will be redirected to a unique URL for your wedding invitation, such as [http://localhost:3000/invitation/{slug}](http://localhost:3000/invitation/{slug}).
- Admins can view all invitations by going to [http://localhost:3000/admin](http://localhost:3000/admin).

## File Structure
```
├── design/               # Contains the HTML templates (design-1.html, design-2.html)
├── public/
│   ├── css/              # CSS files for styling (styles.css)
│   └── uploads/          # Folder for storing uploaded photos
├── views/
│   └── index.html        # Wedding invitation form
├── app.js                # Main server file
└── package.json          # Project dependencies and scripts
```

## Notes
- Ensure that the `public/uploads` directory exists to save uploaded photos.
- Customize the wedding invitation designs by editing the templates in the `design` folder.
- The app restricts users to upload up to 7 photos per wedding invitation.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
