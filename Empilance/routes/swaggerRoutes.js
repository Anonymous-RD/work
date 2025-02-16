/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication Related Endpoints
 */

///////////////////////////////////////////////////////////////////
//////// ADMIN AUTHENTICATION MANAGEMENT ROUTES STARTS ////////////
//////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user with a username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: U2FsdGVkX18HEKlF8tObpCYDxNECtaV2q1qjhr1KZJo=
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: U2FsdGVkX1/ym2Ia3sOHFG1X8BNg4DttnmPKDUps2Ms=
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid credentials.
 *     security: [] # Exclude JWT authentication for this route
 */

/**
 * @swagger
 * /user/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: User already exists or invalid input.
 *     security: [] # Exclude JWT authentication for this route
 */

/**
 * @swagger
 * /user/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Reset user password.
 *     security:
 *       - bearerAuth: []
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's old password
 *                 example: Password123
 *               password:
 *                 type: string
 *                 description: The user's new password
 *                 example: Password1234
 *               passwordConfirm:
 *                 type: string
 *                 description: The user's confirm new password
 *                 example: Password1234
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid credentials.
 */

///////////////////////////////////////////////////////////////////
//////// ADMIN AUTHENTICATION MANAGEMENT ROUTES ENDED ////////////
//////////////////////////////////////////////////////////////////
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication Related Endpoints
 */

///////////////////////////////////////////////////////////////////
//////// ADMIN MASTER ROUTES STARTS ////////////
//////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /masters/modularPermissions:
 *   get:
 *     summary: Retrieve Modular Permissions List
 *     description: Get a list of available modular permissions for role-based access management.
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Successfully retrieved the modular permissions list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Modular Permissions List."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       label:
 *                         type: string
 *                         example: "Role Management"
 *                       key:
 *                         type: string
 *                         example: "Role_Management"
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving modular permissions."
 */

//////////////////////////////////////////////////////////////
////////////// STATIC LIST MANAGEMENT ROUTES START ///////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /masters/static-list/create:
 *   post:
 *     summary: Create a new static list item
 *     description: This endpoint allows you to create a new static list item.
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Department ABC"
 *               type:
 *                 type: string
 *                 example: "department"
 *               priority:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Static list item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Static list item created successfully"
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request due to validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Validation error message"
 */

/**
 * @swagger
 * /masters/static-list/update:
 *   put:
 *     summary: Update an existing static list item
 *     description: This endpoint updates the details of a static list item.
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the static list item to update.
 *                 example: "673ee4dc56b7149086b75edb"
 *               name:
 *                 type: string
 *                 example: "Updated Department"
 *               priority:
 *                 type: number
 *                 example: 2
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Static list item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Static list item updated successfully"
 *       404:
 *         description: Static list item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Static list item not found"
 */

/**
 * @swagger
 * /masters/static-list/delete:
 *   put:
 *     summary: Soft delete a static list item
 *     description: Marks a static list item as inactive.
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the static list item to delete.
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Static list item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Static list item deleted successfully"
 *       404:
 *         description: Static list item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Static list item not found"
 */

/**
 * @swagger
 * /masters/static-list/list:
 *   get:
 *     summary: Retrieve all static list items
 *     description: Fetch a list of all static list items.
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of static list items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "List retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error retrieving static list items
 */

/**
 * @swagger
 * /masters/static-list/{id}:
 *   get:
 *     summary: Retrieve a static list item by ID
 *     description: Fetch details of a static list item by its ID.
 *     tags: [Masters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the static list item to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Static list item retrieved successfully
 *       404:
 *         description: Static list item not found
 */
///////////////////////////////////////////////////////////////////
//////// ADMIN MASTER ROUTES ENDED ////////////
//////////////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Admin User
 *   description: User related endpoints
 */

//////////////////////////////////////////////////////////////
//////// ADMIN USER MANAGEMENT ROUTES STARTS /////////////////
//////////////////////////////////////////////////////////////
/**
 * @swagger
 * /admin-user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with profile details, contact info, and role ID.
 *     tags: [Admin User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin_user
 *               password:
 *                 type: string
 *                 example: Password1234
 *               userType:
 *                 type: string
 *                 example: admin
 *               profile:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: Admin
 *                   lastName:
 *                     type: string
 *                     example: User
 *                   email:
 *                     type: string
 *                     example: adminuser@example.com
 *                   contactInfo:
 *                     type: object
 *                     properties:
 *                       phone:
 *                         type: object
 *                         properties:
 *                           countryCode:
 *                             type: string
 *                             example: +1
 *                           number:
 *                             type: string
 *                             example: 1234567890
 *                       address:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                             example: 123 Main St
 *                           city:
 *                             type: string
 *                             example: Springfield
 *                           state:
 *                             type: string
 *                             example: IL
 *                           zip:
 *                             type: string
 *                             example: 62704
 *               roleId:
 *                 type: string
 *                 example: 6731e366725929de6769d7ef
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Bad request (invalid input).
 */

/**
 * @swagger
 * /admin-user/update:
 *   put:
 *     summary: Update an existing user
 *     description: Update user details based on user ID.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID to update.
 *                 example: 60d9c6b9b60b9e001f120b4d
 *               username:
 *                 type: string
 *                 example: johndoe
 *               profile:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   countyCode:
 *                     type: string
 *                     example: +91
 *                   number:
 *                     type: string
 *                     example: 1234567890
 *                   address:
 *                     type: object
 *                     example: {street: string,city: string,state: string,zip: string}
 *               roleId:
 *                 type: string
 *                 example: 60d9c6b9b60b9e001f120b4d
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /admin-user/delete:
 *   put:
 *     summary: Delete a user
 *     description: Delete a user based on user ID.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user to delete.
 *                 example: 60d9c6b9b60b9e001f120b4d
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /admin-user/list:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a paginated list of all users with optional search by username.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of results per page (default is 10).
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: Search for users by username (partial or full match, case-insensitive).
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Optional search term to filter users by isActive.
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "60d9c6b9b60b9e001f120b4d"
 *                           username:
 *                             type: string
 *                             example: "johndoe"
 *                           profile:
 *                             type: object
 *                             properties:
 *                               firstName:
 *                                 type: string
 *                                 example: "John"
 *                               lastName:
 *                                 type: string
 *                                 example: "Doe"
 *                               email:
 *                                 type: string
 *                                 example: "johndoe@example.com"
 *                           roleId:
 *                             type: string
 *                             example: "60d9c6b9b60b9e001f120b4d"
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /admin-user/{userId}:
 *   get:
 *     summary: Retrieve individual roles details
 *     description: Get individual role details.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d9c6b9b60b9e001f120b4d
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     profile:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                     roleId:
 *                       type: string
 *                       example: 60d9c6b9b60b9e001f120b4d
 *       400:
 *         description: Bad request.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /admin-user/resendEmail/{userId}:
 *   post:
 *     summary: Resend email with user's credentials
 *     description: Resend the email containing the user's login credentials (username and password) based on their user ID.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to resend the email to
 *         schema:
 *           type: string
 *           example: 60d9c6b9b60b9e001f120b4d
 *     responses:
 *       200:
 *         description: Email resent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email resent successfully.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User ID is invalid.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: An error occurred while resending the email.
 */

//////////////////////////////////////////////////////////////
//////// ADMIN USER MANAGEMENT ROUTES ENDED /////////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Admin User Role
 *   description: Admin User Role management endpoints
 */

//////////////////////////////////////////////////////////////
//////// ADMIN USER ROLE MANAGEMENT ROUTES STARTS ////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /admin-user/role/create:
 *   post:
 *     summary: Create a new role
 *     description: Creates a new role with permissions and metadata.
 *     tags: [Admin User Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role.
 *                 example: "Admin"
 *               desc:
 *                 type: string
 *                 description: Description of the role.
 *                 example: "Administrative role with full access."
 *               department:
 *                 type: string
 *                 description: Name of the department.
 *                 example: "Department 1"
 *               modularPermission:
 *                 type: array
 *                 description: Modular permissions for the role.
 *                 items:
 *                   type: string
 *                 example: ["read", "write", "delete"]
 *               functionalPermissionToAdd:
 *                 type: array
 *                 description: Functional permissions for adding.
 *                 items:
 *                   type: string
 *                 example: ["create_user", "add_project"]
 *               functionalPermissionToUpdate:
 *                 type: array
 *                 description: Functional permissions for updating.
 *                 items:
 *                   type: string
 *                 example: ["update_user", "edit_project"]
 *               functionalPermissionToDelete:
 *                 type: array
 *                 description: Functional permissions for deleting.
 *                 items:
 *                   type: string
 *                 example: ["delete_user", "remove_project"]
 *               otherFunctionalPermission:
 *                 type: array
 *                 description: Additional functional permissions.
 *                 items:
 *                   type: string
 *                 example: ["manage_permissions", "view_reports"]
 *     responses:
 *       200:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role created successfully."
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /admin-user/role/update:
 *   put:
 *     summary: Update an existing role
 *     description: Update the details of an existing role by providing its ID.
 *     tags: [Admin User Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the role to be updated.
 *                 example: "605c72b8e935f56f9a7b591b"
 *               name:
 *                 type: string
 *                 description: Name of the role.
 *                 example: "Manager"
 *               desc:
 *                 type: string
 *                 description: Updated description of the role.
 *                 example: "Manager role with limited permissions."
 *               modularPermission:
 *                 type: array
 *                 description: Updated modular permissions for the role.
 *                 items:
 *                   type: string
 *                 example: ["read", "update"]
 *               functionalPermissionToAdd:
 *                 type: array
 *                 description: Updated functional permissions for adding.
 *                 items:
 *                   type: string
 *                 example: ["add_team_member"]
 *               functionalPermissionToUpdate:
 *                 type: array
 *                 description: Updated functional permissions for updating.
 *                 items:
 *                   type: string
 *                 example: ["update_team_member"]
 *               functionalPermissionToDelete:
 *                 type: array
 *                 description: Updated functional permissions for deleting.
 *                 items:
 *                   type: string
 *                 example: ["remove_team_member"]
 *               otherFunctionalPermission:
 *                 type: array
 *                 description: Updated additional functional permissions.
 *                 items:
 *                   type: string
 *                 example: ["view_dashboard"]
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role updated successfully."
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Role not found.
 */

/**
 * @swagger
 * /admin-user/role/delete:
 *   put:
 *     summary: Delete an existing role
 *     description: Delete an existing role by providing its ID in the body.
 *     tags: [Admin User Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the role to be deleted.
 *                 example: "605c72b8e935f56f9a7b591b"
 *     responses:
 *       200:
 *         description: Role deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role deleted successfully."
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Role not found.
 */

/**
 * @swagger
 * /admin-user/role/list:
 *   get:
 *     summary: Retrieve all roles
 *     description: Get a paginated list of all roles available in the system, with an optional search based on role name.
 *     tags: [Admin User Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Optional search term to filter roles by name (case-insensitive, partial match).
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Optional search term to filter roles by isActive.
 *     responses:
 *       200:
 *         description: A paginated list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of active roles matching the search criteria.
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: The maximum number of roles per page.
 *                   example: 10
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "605c72b8e935f56f9a7b591b"
 *                       name:
 *                         type: string
 *                         description: Name of the role.
 *                         example: "Admin"
 *                       desc:
 *                         type: string
 *                         description: Description of the role.
 *                         example: "Administrative role with full access."
 *                       modularPermission:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["read", "write", "delete"]
 *                       functionalPermissionToAdd:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["create_user", "add_project"]
 *                       functionalPermissionToUpdate:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["update_user", "edit_project"]
 *                       functionalPermissionToDelete:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["delete_user", "remove_project"]
 *                       otherFunctionalPermission:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["manage_permissions", "view_reports"]
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Bad request.
 *       404:
 *         description: No roles found.
 */

/**
 * @swagger
 * /admin-user/role/{roleId}:
 *   get:
 *     summary: Retrieve individual roles details
 *     description: Get individual role details.
 *     tags: [Admin User Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: A list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "605c72b8e935f56f9a7b591b"
 *                       name:
 *                         type: string
 *                         description: Name of the role.
 *                         example: "Admin"
 *                       desc:
 *                         type: string
 *                         description: Description of the role.
 *                         example: "Administrative role with full access."
 *                       modularPermission:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["read", "write", "delete"]
 *                       functionalPermissionToAdd:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["create_user", "add_project"]
 *                       functionalPermissionToUpdate:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["update_user", "edit_project"]
 *                       functionalPermissionToDelete:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["delete_user", "remove_project"]
 *                       otherFunctionalPermission:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["manage_permissions", "view_reports"]
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Bad request.
 *       404:
 *         description: No roles found.
 */

//////////////////////////////////////////////////////////////
//////// ROLE MANAGEMENT ROUTES ENDS ////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Admin QuestionBank
 *   description: Questionbank management endpoints
 */
//////////////////////////////////////////////////////////////
//////// QUESTION BANK ROUTES STARTS ////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /admin-question-bank/create:
 *   post:
 *     summary: Create a new question bank entry
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionBankName:
 *                 type: string
 *                 description: Name of the role.
 *                 example: "Question bank 1"
 *               workFlowId:
 *                  type: string
 *                  example: "6732f16decfa3dc391055b92"
 *               questionList:
 *                 type: object
 *                 description: The question content with mixed structure
 *                 additionalProperties: true
 *                 example:
 *                  {"questionText": "What is the capital of France?",
 *                  "options": ["Paris", "London", "Rome", "Berlin"]}
 *               tag:
 *                 type: string
 *                 example: RTT
 *                 enum:
 *                  - RTT
 *                  - Assessment
 *
 *     responses:
 *       200:
 *         description: Question bank created successfully
 */

/**
 * @swagger
 * /admin-question-bank/update:
 *   put:
 *     summary: Update a question bank
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id of the to be changed questionbank
 *                 example: "605c72b8e935f56f9a7b591b"
 *               questionBankName:
 *                 type: string
 *                 description: Name of the role.
 *                 example: "Question bank 1"
 *               questionList:
 *                 type: object
 *                 description: The question content with mixed structure
 *                 additionalProperties: true
 *                 example:
 *                  {"questionText": "What is the capital of France?",
 *                  "options": ["Paris", "London", "Rome", "Berlin"]}
 *               workFlowId:
 *                 type: string
 *                 description: Workflow id.
 *                 example: "605c72b8e935f56f9a7b591b"
 *               isPublish:
 *                 type: boolean
 *                 description: Its Published or not.
 *                 example: false
 *               metadata:
 *                 type: object
 *                 properties:
 *                  createdBy:
 *                     type: string
 *                  updatedBy:
 *                     type: string
 *     responses:
 *       200:
 *         description: Question bank updated successfully
 *       404:
 *         description: Question bank not found
 */

/**
 * @swagger
 * /admin-question-bank/delete:
 *   put:
 *     summary: Delete a question bank
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id of the to be changed questionbank
 *                 example: "605c72b8e935f56f9a7b591b"
 *
 *     responses:
 *       200:
 *         description: Question bank deleted successfully
 *       404:
 *         description: Question bank not found
 */

/**
 * @swagger
 * /admin-question-bank/list/{tag}:
 *   get:
 *     summary: Retrieve all question banks for the admin by tag
 *     description: Get a list of all question banks for the admin filtered by a specific tag, with pagination options and optional search by question bank name.
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag to filter the question banks.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: questionBankName
 *         schema:
 *           type: string
 *         description: Optional search term to filter question banks by name.
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Optional search term to filter question banks by isActive.
 *     responses:
 *       200:
 *         description: A list of question banks for the admin with pagination and optional search by name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 questionBanks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "605c72b8e935f56f9a7b591b"
 *                       questionBankName:
 *                         type: string
 *                         example: "General Knowledge Questions"
 *                       questionList:
 *                         type: object
 *                         description: List of questions in various formats
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       metadata:
 *                         type: object
 *                         description: Metadata for the question bank
 *                         properties:
 *                           createdBy:
 *                             type: string
 *                             example: "603d2c5268a8c8123d89c6e7"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-01-25T15:30:00Z"
 *                       workFlowId:
 *                         type: string
 *                         description: Reference to the workflow related to the question bank
 *                         example: "605c72b8e935f56f9a7b591c"
 *                       currentStage:
 *                         type: integer
 *                         example: 1
 *                       history:
 *                         type: array
 *                         description: History of workflow actions on the question bank
 *                         items:
 *                           type: object
 *                           properties:
 *                             stage:
 *                               type: string
 *                               example: "Review"
 *                             action:
 *                               type: string
 *                               example: "Approved"
 *                             approvedBy:
 *                               type: string
 *                               description: User ID of the approver
 *                               example: "603d2c5268a8c8123d89c6e7"
 *                             approvedAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-01-25T15:35:00Z"
 *                       tag:
 *                         type: string
 *                         example: "Science"
 *       400:
 *         description: Bad request due to invalid parameters.
 *       404:
 *         description: No question banks found for the specified tag or search term.
 */

/**
 * @swagger
 * /admin-question-bank/status:
 *   get:
 *     summary: Get Question Bank Status.
 *     description: Get Question Bank status count for Total, Drafted, Published, Archived.
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Question Bank status count object for Total, Drafted, Published, Archived.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Question Bank Status
 *                 data:
 *                   type: object
 *                   properties:
 *                       totalCount:
 *                         type: number
 *                         example: 10
 *                       draftedCount:
 *                         type: number
 *                         example: 8
 *                       publishedCount:
 *                         type: number
 *                         example: 10
 *                       archivedCount:
 *                         type: number
 *                         example: 5
 *       400:
 *         description: Bad request due to invalid parameters.
 *       404:
 *         description: No question banks found for the specified tag or search term.
 */

/**
 * @swagger
 * /admin-question-bank/{id}:
 *   get:
 *     summary: Retrieve individual questionbank details
 *     description: Get individual questionbank details.
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Questionbank ID
 *     responses:
 *       200:
 *         description: Question Bank data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Question Bank Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 6735e58e4fbd076dd049d687
 *                           questionBankName:
 *                             type: string
 *                             example: asdasd
 *                           questionList:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 domainName:
 *                                   type: string
 *                                   example: asdasd
 *                                 questions:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       source:
 *                                         type: string
 *                                         example: Custom Question
 *                                       question:
 *                                         type: string
 *                                         example: werwer
 *                                       input:
 *                                         type: array
 *                                         items:
 *                                           type: object
 *                                           properties:
 *                                             inputType:
 *                                               type: string
 *                                               example: singleSelect
 *                                             placeholder:
 *                                               type: string
 *                                               example: Enter a placeholder
 *                                             options:
 *                                               type: array
 *                                               items:
 *                                                 type: string
 *                                               example: []
 *                                             default:
 *                                               type: string
 *                                               example: null
 *                                             isRemark:
 *                                               type: boolean
 *                                               example: true
 *                                             isRequired:
 *                                               type: boolean
 *                                               example: false
 *                                             isReadOnly:
 *                                               type: boolean
 *                                               example: false
 *                                             isCommentBox:
 *                                               type: boolean
 *                                               example: true
 *                           currentStage:
 *                             type: integer
 *                             example: 1
 *                           tag:
 *                             type: string
 *                             example: true
 *       400:
 *         description: Bad request.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /admin-question-bank/clone/{id}:
 *   post:
 *     summary: Clone an existing question bank.
 *     tags: [Admin QuestionBank]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the question bank to clone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionBankName:
 *                 type: string
 *                 description: The name of the cloned question bank.
 *                 example: "Cloned Question Bank"
 *     responses:
 *       200:
 *         description: Successfully cloned the question bank.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Question bank cloned successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the cloned question bank.
 *                     questionBankName:
 *                       type: string
 *                       description: Name of the cloned question bank.
 *                     isActive:
 *                       type: boolean
 *                       description: Whether the cloned question bank is active.
 *       400:
 *         description: Invalid request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Valid question bank ID is required."
 *       404:
 *         description: Question bank not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "No question bank found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Failed to clone question bank."
 */

//////////////////////////////////////////////////////////////
//////// QUESTION BANK ROUTES ENDS ////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Admin Workflow
 *   description: Workflow management endpoints
 */
//////////////////////////////////////////////////////////////
////////////// ADMIN WORKFLOW ROUTES STARTS //////////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /admin-work-flow/create:
 *     post:
 *       summary: Create a new workflow
 *       description: This endpoint allows you to create a new workflow.
 *       tags:
 *         - Admin Workflow
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Document Review Workflow"
 *               tag:
 *                 type: string
 *                 example: "RTT"
 *               stages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sno:
 *                       type: number
 *                       example: 1
 *                     state:
 *                       type: string
 *                       example: "Draft"
 *                     actions:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "review"
 *                     nextState:
 *                       type: string
 *                       example: "Under Review"
 *                     userAllowed:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example:
 *                           "605c72b8e935f56f9a7b591b"
 *
 *       responses:
 *         '200':
 *           description: Workflow created successfully
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: true
 *               msg:
 *                 type: string
 *                 example: "Workflow created successfully"
 *         '400':
 *           description: Bad request due to validation errors
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *               msg:
 *                 type: string
 *                 example: "Validation error message"
 */

/**
 * @swagger
 * /admin-work-flow/update:
 *   put:
 *     summary: Update a specific workflow.
 *     description: Update a specific workflow as a whole or by stage.
 *     tags:
 *       - Admin Workflow
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: objectId
 *                 example: "60c72b2f9b1e8e6a3e58f5b5"
 *               index:
 *                 type: number
 *                 example: 1
 *               stages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sno:
 *                       type: number
 *                       example: 1
 *                     state:
 *                       type: string
 *                       example: "Review"
 *                     actions:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "review"
 *                     nextState:
 *                       type: string
 *                       example: "Completed"
 *                     userAllowed:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["605c72b8e935f56f9a7b591b", "605c72b8e935f56f9a7b591b"]
 *     responses:
 *       '200':
 *         description: Workflow updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Update Successfully"
 *                 data:
 *                   type: object
 *                   description: Updated workflow data
 *       '404':
 *         description: Workflow not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Workflow not found"
 *       '400':
 *         description: Bad request due to validation errors or update failures
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Workflow update failed: error message"
 */

/**
 * @swagger
 * /admin-work-flow/stageApproval:
 *     put:
 *       summary: Change the approval of a stage
 *       description: Change the approval of a stage.
 *       tags:
 *         - Admin Workflow
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: objectId
 *                 example: "60c72b2f9b1e8e6a3e58f5b5"
 *               index:
 *                 type: number
 *                 example: 1  # Index of the stage to be approved
 *               action:
 *                 type: string
 *                 example: "approve"  # The action to set for the stage
 *
 *       responses:
 *         '200':
 *           description: Stage updated successfully
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 example: "Update Successfully"
 *               data:
 *                 type: object
 *                 description: Updated workflow data
 *         '404':
 *           description: Workflow not found
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *               msg:
 *                 type: string
 *                 example: "Workflow not found"
 *         '400':
 *           description: Bad request due to validation errors or update failures
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *               msg:
 *                 type: string
 *                 example: "Workflow action change failed: error message"
 */

/**
 * @swagger
 * /admin-work-flow/delete:
 *   post:
 *     summary: Soft delete a workflow by marking it as inactive.
 *     tags:
 *       - Admin Workflow
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the workflow to delete.
 *             required:
 *               - id
 *               - updatedBy
 *     responses:
 *       200:
 *         description: Workflow successfully marked as deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Deleted Successfully"
 *       404:
 *         description: Workflow not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Workflow not found"
 *       400:
 *         description: Error in request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Workflow delete failed: <error message>"
 */

/**
 * @swagger
 * /admin-work-flow/list/{tag}:
 *   get:
 *     summary: Retrieve a paginated list of all workflows.
 *     description: Get a list of all workflows filtered by a specific tag with optional name search and pagination.
 *     tags:
 *       - Admin Workflow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag to filter the workflows (only "RTT" or "ASSESSMENT" are valid).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of workflows per page (default is 10).
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A keyword to search workflows by name.
 *     responses:
 *       200:
 *         description: Successfully retrieved a paginated list of workflows.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "List of all workflows"
 *                 data:
 *                   type: object
 *                   properties:
 *                     workflows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Unique identifier for the workflow.
 *                           name:
 *                             type: string
 *                             description: Name of the workflow.
 *                           isActive:
 *                             type: boolean
 *                             description: Status indicating if the workflow is active.
 *                           metadata:
 *                             type: object
 *                             description: Additional metadata for the workflow.
 *                     totalItems:
 *                       type: integer
 *                       description: Total number of workflows for the specified tag and search criteria.
 *                       example: 100
 *                     currentPage:
 *                       type: integer
 *                       description: Current page of the paginated results.
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       description: Number of workflows per page.
 *                       example: 10
 *       400:
 *         description: Failed to retrieve workflows due to an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Getting workflow failed: <error message>"
 */

/**
 * @swagger
 * /admin-work-flow/{workflowId}:
 *   get:
 *     summary: Retrieve a specific workflow by its ID.
 *     tags:
 *       - Admin Workflow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workflowId
 *         required: true
 *         description: Workflow ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the workflow by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Workflow gotten by id"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the workflow.
 *                     name:
 *                       type: string
 *                       description: Name of the workflow.
 *                     metadata:
 *                       type: object
 *                       description: Additional metadata for the workflow.
 *       404:
 *         description: Workflow not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Workflow not found"
 *       400:
 *         description: Error retrieving the workflow.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Getting workflow by id failed: <error message>"
 */

/**
 * @swagger
 * /admin-work-flow/clone/{workflowId}:
 *   post:
 *     summary: Clone an existing workflow.
 *     tags:
 *       - Admin Workflow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workflowId
 *         required: true
 *         description: ID of the workflow to clone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the cloned workflow.
 *                 example: "Cloned Workflow"
 *     responses:
 *       200:
 *         description: Successfully cloned the workflow.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Workflow cloned successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the cloned workflow.
 *                     name:
 *                       type: string
 *                       description: Name of the cloned workflow.
 *                     metadata:
 *                       type: object
 *                       description: Metadata for the cloned workflow.
 *       400:
 *         description: Invalid request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "name is required."
 *       404:
 *         description: Workflow not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Workflow not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Failed to clone workflow."
 */

//////////////////////////////////////////////////////////////
/////////////// ADMIN WORKFLOW ROUTES ENDS ///////////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * tags:
 *   name: Vendor Management
 *   description: Endpoints to manage vendors and their details.
 */

//////////////////////////////////////////////////////////////
////////////// VENDOR MANAGEMENT ROUTES STARTS //////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /app-vendor/create:
 *   post:
 *     summary: Create a new vendor
 *     description: This endpoint allows you to create a new vendor.
 *     tags:
 *       - Vendor Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vendor ABC"
 *               panNumber:
 *                 type: string
 *                 example: "ABCDE1234F"
 *               gstNumber:
 *                 type: string
 *                 example: "22ABCDE1234F1Z5"
 *               rttStatus:
 *                 type: string
 *                 example: "Active"
 *               assessmentStatus:
 *                 type: string
 *                 example: "Pending"
 *               activityOutsourced:
 *                 type: string
 *                 example: "Manufacturing"
 *               department:
 *                 type: string
 *                 example: "Procurement"
 *               spocName:
 *                 type: string
 *                 example: "John Doe"
 *               spocNumber:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Vendor created successfully"
 *                 data:
 *                   type: object
 *                   description: Created vendor details
 *       400:
 *         description: Bad request due to validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Validation error message"
 */

/**
 * @swagger
 * /app-vendor/update:
 *   put:
 *     summary: Update vendor details
 *     description: Update specific details of a vendor.
 *     tags:
 *       - Vendor Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The vendor's ID to update.
 *                 example: 673ee4dc56b7149086b75edb
 *               name:
 *                 type: string
 *                 example: "Vendor ABC Updated"
 *               panNumber:
 *                 type: string
 *                 example: "ABCDE1234F"
 *               gstNumber:
 *                 type: string
 *                 example: "22ABCDE1234F1Z5"
 *               rttStatus:
 *                 type: string
 *                 example: "Inactive"
 *               assessmentStatus:
 *                 type: string
 *                 example: "Approved"
 *               activityOutsourced:
 *                 type: string
 *                 example: "Logistics"
 *               department:
 *                 type: string
 *                 example: "Logistics"
 *               spocName:
 *                 type: string
 *                 example: "Jane Smith"
 *               spocNumber:
 *                 type: string
 *                 example: "+0987654321"
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Vendor updated successfully"
 *       404:
 *         description: Vendor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Vendor not found"
 *       400:
 *         description: Validation or update failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Vendor update failed: error message"
 */

/**
 * @swagger
 * /app-vendor/delete:
 *   put:
 *     summary: Delete a vendor
 *     description: Soft delete a vendor by marking it as inactive.
 *     tags:
 *       - Vendor Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the vendor to delete.
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Vendor successfully marked as deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Vendor deleted successfully"
 *       404:
 *         description: Vendor not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Vendor not found"
 *       400:
 *         description: Error in request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Vendor delete failed: error message"
 */

/**
 * @swagger
 * /app-vendor/list:
 *   get:
 *     summary: Retrieve a list of all vendors
 *     description: Get a list of all vendors with optional pagination and search.
 *     tags:
 *       - Vendor Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of vendors per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: A keyword to search vendors by name.
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Optional search term to filter vendors by isActive.
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of vendors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "List of vendors retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       department:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *       400:
 *         description: Error retrieving vendors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Error retrieving vendors: error message"
 */

/**
 * @swagger
 * /app-vendor/status:
 *   get:
 *     summary: Get Vendors Status.
 *     description: Get Vendors status count for All Vendors, In Process, Active, Inactive, Offboarded.
 *     tags:
 *       - Vendor Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Vendors status count for All Vendors, In Process, Active, Inactive, Offboarded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Vendors Status
 *                 data:
 *                   type: object
 *                   properties:
 *                       totalVendors:
 *                         type: number
 *                         example: 20
 *                       inProcessCount:
 *                         type: number
 *                         example: 8
 *                       activeCount:
 *                         type: number
 *                         example: 10
 *                       inactiveCount:
 *                         type: number
 *                         example: 5
 *                       offboardedCount:
 *                         type: number
 *                         example: 1
 */

/**
 * @swagger
 * tags:
 *   name: RTT
 *   description: Endpoints to manage RTT and their details.
 */

//////////////////////////////////////////////////////////////
////////////// RTT ROUTES STARTS //////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /app-rtt/initiate:
 *   post:
 *     summary: Initiate a RTT.
 *     description: This endpoint allows you to initiate a RTT.
 *     tags:
 *       - RTT
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendorId:
 *                 type: string
 *                 example: "673f2d233bade38757751b33"
 *               rttQuesId:
 *                 type: string
 *                 example: "67484437d50f605f95be9823"
 *               workflowId:
 *                 type: string
 *                 example: "674843c2d50f605f95be9819"
 *     responses:
 *       201:
 *         description: RTT initiated created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "RTT initiated successfully"
 *                 data:
 *                   type: object
 *                   description: Initiated RTT details
 *       400:
 *         description: Bad request due to validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Validation error message"
 */
/**
 * @swagger
 * /app-rtt/list:
 *   get:
 *     summary: Retrieve an RTT List
 *     description: Get an RTT list with optional pagination and search by vendor's name.
 *     tags:
 *       - RTT
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of RTT entries per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: A keyword to search RTT by vendor's name.
 *     responses:
 *       200:
 *         description: Successfully retrieved an RTT list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "RTT List retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     RTTData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6751761395d9fcdf641ec23c"
 *                           vendorId:
 *                             type: string
 *                             example: "673f2d233bade38757751b33"
 *                           status:
 *                             type: string
 *                             example: "initiated"
 *                           isActive:
 *                             type: boolean
 *                             example: true
 *                           initiatedDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-05T09:44:51.747Z"
 *                           vendorDetails:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Vendor ABC"
 *                     totalItems:
 *                       type: integer
 *                       example: 1
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Error retrieving RTT list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 msg:
 *                   type: string
 *                   example: "Error retrieving RTT list: error message"
 */

/**
 * @swagger
 * /app-rtt/status:
 *   get:
 *     summary: Get RTT Status.
 *     description: Get RTT status count for Total, Initiated, In-Progress, Completed.
 *     tags: [RTT]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get RTT status count object for Total, Initiated, In-Progress, Completed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: RTT Status
 *                 data:
 *                   type: object
 *                   properties:
 *                       totalCount:
 *                         type: number
 *                         example: 10
 *                       initiatedCount:
 *                         type: number
 *                         example: 8
 *                       inProgressCount:
 *                         type: number
 *                         example: 10
 *                       completedCount:
 *                         type: number
 *                         example: 5
 */

/**
 * @swagger
 * tags:
 *   name: Assessment
 *   description: Endpoints to manage Assessment and their details.
 */

//////////////////////////////////////////////////////////////
////////////// Assessment ROUTES STARTS //////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * /app-assessment/initiate:
 *   post:
 *     summary: Initiate a Assessment.
 *     description: This endpoint allows you to initiate a Assessment.
 *     tags:
 *       - Assessment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendorId:
 *                 type: string
 *                 example: "673f2d233bade38757751b33"
 *               assessmentQuesId:
 *                 type: string
 *                 example: "67517bc3baa2a298078d94d4"
 *               workflowId:
 *                 type: string
 *                 example: "674843c2d50f605f95be9819"
 *     responses:
 *       201:
 *         description: Assessment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Assessment initiated successfully"
 *                 data:
 *                   type: object
 *                   description: Initiated Assessment details
 *       400:
 *         description: Bad request due to validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Validation error message"
 */

/**
 * @swagger
 * /app-assessment/list:
 *   get:
 *     summary: Retrieve a Assessment List
 *     description: Get a Assessment list with optional pagination and search.
 *     tags:
 *       - Assessment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of Assessments per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: A keyword to search Assessments by vendor's name.
 *     responses:
 *       200:
 *         description: Successfully retrieved an Assessment list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Assessment list retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     AssessmentData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           vendorId:
 *                             type: string
 *                           status:
 *                             type: string
 *                             example: "initiated"
 *                           isActive:
 *                             type: boolean
 *                             example: true
 *                           initiatedDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-05T10:10:49.841Z"
 *                           vendorDetails:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Vendor ABC"
 *                     totalItems:
 *                       type: integer
 *                       example: 1
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Error retrieving Assessment list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Error retrieving Assessment list: error message"
 */
/**
 * @swagger
 * /app-assessment/status:
 *   get:
 *     summary: Get Assessments Status.
 *     description: Get Assessments status count for Total, Initiated, In-Progress, Completed.
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Assessments status count object for Total, Initiated, In-Progress, Completed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Assessments Status
 *                 data:
 *                   type: object
 *                   properties:
 *                       totalCount:
 *                         type: number
 *                         example: 10
 *                       initiatedCount:
 *                         type: number
 *                         example: 8
 *                       inProgressCount:
 *                         type: number
 *                         example: 10
 *                       completedCount:
 *                         type: number
 *                         example: 5
 */
/**
 * @swagger
 * tags:
 *   name: Form Controllers
 *   description: Endpoints to manage form details.
 */

//////////////////////////////////////////////////////////////
////////////// Fomr Controllers STARTS //////////////
//////////////////////////////////////////////////////////////
/**
 * @swagger
 * /app-form/submit:
 *   post:
 *     summary: Submit Form
 *     description: This endpoint allows you to submit form.
 *     tags:
 *       - Form Controllers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formId:
 *                 type: string
 *                 example: "RTT_6757e690fe5f25e6fc773549"
 *     responses:
 *       201:
 *         description: Form submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Form submitted successfully."
 *                 data:
 *                   type: object
 *                   description: Form submitted details
 *       400:
 *         description: Bad request due to validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Validation error message"
 */
/**
 * @swagger
 * /app-form/{formId}:
 *   get:
 *     summary: Retrieve a specific form details by its ID.
 *     tags:
 *       - Form Controllers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: formId
 *         required: true
 *         description: Form ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the form details by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
//////////////////////////////////////////////////////////////
//////// SWAGGER DOCUMENTATION COMPONENTS STARTS /////////////
//////////////////////////////////////////////////////////////

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *           example: johndoe
 *         password:
 *           type: string
 *           description: The user's password
 *           example: Password123
 *         profile:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: John
 *             lastName:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *             contactInfo:
 *               type: object
 *               properties:
 *                 phone:
 *                   type: object
 *                   properties:
 *                     countryCode:
 *                       type: string
 *                       example: +1
 *                     number:
 *                       type: string
 *                       example: 1234567890
 *                 address:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                       example: 123 Main St
 *                     city:
 *                       type: string
 *                       example: New York
 *                     state:
 *                       type: string
 *                       example: NY
 *                     zip:
 *                       type: string
 *                       example: 10001
 *     SignupRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: Password@123
 *         profile:
 *           $ref: '#/components/schemas/User/properties/profile'
 */

///////////////////////////////////////////////////////////////
//////// SWAGGER DOCUMENTATION COMPONENTS ENDED //////////////
//////////////////////////////////////////////////////////////
