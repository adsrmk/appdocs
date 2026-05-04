# Error Establishing a Database Connection

This error means that WordPress is unable to connect to its database. It's usually caused by incorrect credentials, database corruption, or a temporary server-side issue.
Follow the troubleshooting steps below to identify and resolve the problem.

<br>

## 1. Verify the database credentials in `wp-config.php`

Start by checking the credentials stored in your WordPress configuration file.

1. Log in to your **OS Cloud** panel.
2. Go to the **Websites** section, select your website, and open the **File Manager**.
3. Navigate to your WordPress root directory (usually `/public_html/`).
4. Open the `wp-config.php` file for editing. You'll find entries like this:

```php [/public_html/wp-config.php]
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASSWORD', 'your_database_password');
define('DB_HOST', 'localhost');
```

<br>

## 2. Verify the database details in the panel

Once you've reviewed the credentials in `wp-config.php`, make sure they match the actual database details in the panel.

1. In the panel, go to your website and select **Databases**.
2. Confirm that the values for `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in `wp-config.php` match an existing database in the list.

If any of these details don't match, update them in `wp-config.php` to reflect the correct database name and user.

> **Tip:** You can also create new database users under the **Database users** section if needed.

<br>

## 3. Reset the MySQL user password

If the database details look correct, the issue is most likely the password. In that case, reset the MySQL user's password and update it in `wp-config.php`.

1. Go back to the **Database users** section.
2. Select the user whose password you want to change.

<br>

<img width="1342" height="300" alt="image" src="https://github.com/user-attachments/assets/19f2f174-bd70-4215-9a4f-18e87a8fc2a4" />\

<br>

3. Click **Reset** in the top-right of the block and enter a new password in the input field.

<br>

<img width="617" height="369" alt="image" src="https://github.com/user-attachments/assets/7885a7ed-ed3f-401f-bce3-e977c86c0c78" />

<br>

4. Click **Change password** to confirm. Then update the `DB_PASSWORD` value in your `wp-config.php` file with the new password.

<br>

## 4. Make sure the MySQL user has the right permissions

1. Go back to the **Database users** section.
2. Select the user whose privileges you want to edit.
3. Scroll down to the **Database access** section.
4. Click the kebab menu (three vertical dots) on the right and select **Edit privileges**.

<br>

<img width="1329" height="390" alt="image" src="https://github.com/user-attachments/assets/6407579a-c60f-48a3-ab58-8c93290186ec" />

<br>

5. Tick the box **All database privileges**.

<br>

<img width="617" height="245" alt="image" src="https://github.com/user-attachments/assets/ba03a710-9e83-411d-9c91-ced13a9b9fca" />

<br>

6. Save your changes and exit.

<br>

This gives the MySQL user full access to the database, ensuring WordPress can connect and function correctly.
