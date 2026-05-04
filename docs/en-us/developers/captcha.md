# CAPTCHA

CAPTCHA is a security tool used on websites to tell the difference between humans and automated bots. Its goal is to block spam and malicious bots from using your forms while letting real people through easily.

It challenges users with tasks that are easy for humans but hard for bots, such as recognizing distorted text or selecting certain images. Bots typically cannot process these tasks effectively.

<img width="367" height="118" alt="image" src="https://github.com/user-attachments/assets/e46366c8-125c-4ffe-9069-80c580b537f6" />


<br>

## Risks Without CAPTCHA

Without CAPTCHA, bots can attack your website by:

- Flooding your contact forms with spam.
- Posting malicious links in your comment sections.
- Creating thousands of fake user accounts.
- Trying to guess passwords on your login page.

These attacks can slow down your site, fill your database with junk, and create security risks.

<br>


## Types of CAPTCHA

Below is a quick comparison of common CAPTCHA types, highlighting how they work, what the user experience is like, and their level of security

| Type           | How it Works                               | User Experience                                                  | Security                                                       |
| :------------- | :----------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------- |
| **Text/Image** | You type distorted letters/numbers.        | **Bad.** Annoying and often hard to read.                        | **Low.** Modern bots can easily solve these.                   |
| **Checkbox**   | You click an "I'm not a robot" box.        | **Good.** Simple for humans, but may ask for an image challenge. | **High.** Very effective at stopping most bots.                |
| **Invisible**  | Works in the background, no clicks needed. | **Excellent.** Completely frictionless for users.                | **Very High.** The modern standard for security and usability. |

<br>

## Install

The best method for most websites is using a service like Google reCAPTCHA (v3, Invisible).

### Step 1: Get Keys from Google
1. Go to the [Google reCAPTCHA website](https://www.google.com/recaptcha/).
2. Register your site and choose **reCAPTCHA v3**.
3. Google will give you two keys: a **Site Key** and a **Secret Key**.

### Step 2: Add to Your Website

**For WordPress:**
1. Install a plugin like **WPForms**, **Contact Form 7**, or **reCAPTCHA by BestWebSoft**.
2. Go to the plugin's settings.
3. Paste in your **Site Key** and **Secret Key**.
4. Save. The plugin handles the rest.

**For Custom Websites:**
1. Add a code snippet from Google to your website's HTML.
2. Use your **Secret Key** in your backend code to verify users when they submit a form.






