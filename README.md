<h1 align="center">
  <img width="100" src="https://drive.google.com/uc?id=0BxAI7eJbF8iDMHRkUWdoeG93Mm8" alt="awesome">
  <br>
</h1>

# Template generator
Template generator (TG) is a full suite of 20 templates with a built-in content management system. The templates of the TG can be used together to build a fully featured website. With the growth of popularity of the website, more templates will be added.

## How to use
This web-site is very easy to use. To create a new page, click on navigation and choose the block from the list. You can change everything, that you create on the website. Use the right mouse button to perform any changes. In addition, there are the global settings (to change the font and spacing between the lines) that function for all the blocks.
What else?  Find out by clicking on the link below! 
[templategenerator.esy.es](templategenerator.esy.es).

##How to build your own TG

Clone a copy of the main TG git repo by running:

```bash
git clone https://github.com/mrsecret911/template-generator.git
```

Enter the TG directory:
```bash
cd template-generator 
```
First, you should install all the packages:
```bash
npm install
```
Then update all the libraries in your project directory:
```bash
bower update
```
Afterwards, run the build script:
```bash
gulp
```
Enter the command below to watch a TG site in your browser by the link [http://localhost:8080](localhost:8080/):
```bash
gulp serve
```
##Creators
The TG website is created and maintained by Taras, Nazar and Stanislav (Front-end lab3)