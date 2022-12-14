# Zip-E-Doc

Zip-E-Doc is a web based text editor that allows you to create, edit, save, share, and delete text documents. Using a cloud based document editor has the added benefit of being accessible from any internet connected device, making it a convenient tool for those who work remotely or on the go.

## Creators' Github Links

- [Tristanj0](https://github.com/Tristanj0)
- [mike-348](https://github.com/mike-348)
- [ericarterbridge](https://github.com/ericarterbridge)
- [chuddayo](https://github.com/chuddayo)

## Getting Started

To start using Zip-E-Doc, first open up a new terminal window and clone the project to your local machine.
```
git clone https://github.com/Zip-E-Doc/zip-e-doc.git
```
Then navigate to the directory:
```
cd zip-e-doc
```
Next run the command below to run the Maven project
```
./mvnw
```
Finally open up another terminal window, navigate to the project path, and run the following command to launch Zip-E-Doc in your browser!
```
npm start
```


## Usage

A logged-in user can create new documents from scratch or from a template that consist of images and text, as well as view a list of all documents they own or are shared by another user, view documents filtered by a search term, and can download / upload documents to / from their desktop.

## Storage

With Zip-E-Doc, all our documents are backed up in our AWS (S3) bucket, auto-saving all of our hard work without worry.

## Users

- Single Users
- Multiple Users (with read-only share access)
- Students
- Corporate Partners

## Auto-Saving

![](https://github.com/Zip-E-Doc/zip-e-doc/blob/main/src/main/webapp/content/images/autosave_gif_1.gif)

## Templates

![](https://github.com/Zip-E-Doc/zip-e-doc/blob/main/src/main/webapp/content/images/template_gif_1.gif)

## Share Documents

![](https://github.com/Zip-E-Doc/zip-e-doc/blob/main/src/main/webapp/content/images/share_gif_1.gif)


## Built With

Java, Spring Boot, AWS (S3), and React
