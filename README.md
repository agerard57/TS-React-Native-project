# TS_React-Native-Kanban

![TS_React-Native-Kanban](https://user-images.githubusercontent.com/56207146/190213685-8b47d3f8-4b31-411d-aa69-ad825b10bb02.jpg)

> :warning: **This app could only be tested with an android device**: 
> Some feature might look / work differently with another OS

## Table of Contents

ddd

## Starting the project

### Downloading and running the project

- Clone / Download this project
- Open _Visual Studio Code_
- Open a CLI and install the dependencies with `npm run install-all`
- In _api_, rename the `.example.env` file into `.env` and fill in the keys.

![env](https://user-images.githubusercontent.com/56207146/190208610-667db35e-b0fd-444a-a820-d0b10e5e10ec.png)

#### Setup the automatic project launch

Theses steps makes the project launch itself automatically and only has to be
done once

- Go to the **"TS-React-Native-project.code-workspace"** file and click on the
  "Open Workspace" button

  ![Workspace](https://user-images.githubusercontent.com/56207146/160180330-3c543095-cc5b-477f-8d91-0f6a7f5adf80.png)

- Once the workspace is open, open the Command Palette and write down
  "`>Tasks: Run Task`". Select the option and then "`Run all`"

![Tasks](https://user-images.githubusercontent.com/56207146/162626219-2e9f9722-4380-407a-a14d-06327949d8be.png)

- Two terminals will open and run the command. On this point onwards,
  each time you open the workshop, the task will automatically run.

> :information_source: A prompt might ask your authorization to accept or deny
> the automatic launch.

#### Manual project launch

Open a terminal and type in :

- For the server: "`npm run start:server`"
- For the client: "`npm run start:client`"

---

## Client

This app is a basic kanban that explores the possibilities with React Native / Expo in TypeScript. It also comes with it's own REST api.

### Core features

#### Color themes

This project has a built-in color theme manager that checks the device's 
color preference (light theme or dark theme) and applies it to all the pages.
The content, however, stays the same

| **Light theme**                                                                                               | **Dark theme**                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![Light theme](https://user-images.githubusercontent.com/56207146/190215220-fecc8c65-1adb-47cf-a3ed-2bab62ffa74d.jpg) | ![Dark theme](https://user-images.githubusercontent.com/56207146/190215206-19f2d9f3-af7e-4cc3-8c15-089687fe2439.jpg) |

#### Header bar

Each page has an header bar that displays the page's name. On the right, there can also be additionnal buttons (ie. about, add, edit, favorite / unfavorite).
![Header bar](https://user-images.githubusercontent.com/56207146/190217471-161e4172-78ad-4d25-bd36-7a245cf5506e.png)

#### Navigation bar

To go from one page to another, a navigation bar has been setup. You can either go to the _Home page_ or the _Todo List_ with it.
> Note that the page you are on is selected and therefore colored.

![Navigation bar](https://user-images.githubusercontent.com/56207146/190216320-10ea5808-53cc-4b41-bdc1-b56f18eeb459.png)

#### Alert

Some features (eg. delete a task) will make an alert dialog appear.
The user can then choose to cancel or proceed.

![Alert](https://user-images.githubusercontent.com/56207146/190221739-507b0eb8-c2b0-4e31-9d4c-bb470069739a.jpg)

#### Toaster

Some features (eg. delete a task) will make a toast appear. It will appear in 3 modes (success, alert, error)

![Toaster](https://user-images.githubusercontent.com/56207146/190223127-977bba26-fc28-4065-a364-6eddd420c1c2.png)

### Home page

The home page is a basic screen that welcomes the user and displays all the favorite tasks.

It uses _<ScrollView>_, a wrapper unique to React Native that allows the user to scroll down

![Home](https://user-images.githubusercontent.com/56207146/190218141-3ec4d426-2926-4833-9390-9cbddee6f015.jpg)

### Todo list

#### Header button

The header button will redirect you to the "Add todo" page.

#### Tables

This page displays all the tasks and sort them in 3 tables: 
* TODO
* IN PROGRESS
* DONE

Each table uses _<FlatList>_, a wrapper unique to React Native that allows the user pass data 
to the component as well as a child component to lazily iterate in them and scroll, if neccessary.
The component will also render a special component if the array is empty (ie. a text saying "No todos" ).

#### Cards 

Each card will display:
* The title,
* An image icon (if the task has one),
* A star (if the task is favorite),
* A trimmed down version of the description,
* The author
* An edit button
* A delete button

![todo_list](https://user-images.githubusercontent.com/56207146/190219585-61ba9cbd-0895-4a6e-9e3d-5b7985132920.png)

### View todo

#### Contents

Here displayed is:
* In the header:
  * A empty/full star icon (that will favorite / unfavorite the task)
  * An edit icon that will redirect you to the "Edit todo" page
  * A delete icon that will do exactly as it's name implies
* In the container:
  * All three list names (the task's one will be in bold)
  * The title,
  * The "last update" date
  * An image (if there is one)
  * The full description
  * The author
* Under the container:  
  * A "Back" button redirects back to the list page

![View todo](https://user-images.githubusercontent.com/56207146/190223630-90964e62-9b56-4c32-9637-26e1be6737a9.png)

### Add/Edit todo

The same form component is used with those two pages.
If the user edits the todo, the form will get the todo and fill what's already filled.

Every input has, thanks to _yup_, a verification system that will trigger a message if not met.
When all the verifications are correct, only then the button will be clickable.

| **Add task**                                                                                               | **Edit task**                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![Add](https://user-images.githubusercontent.com/56207146/190227738-62175839-17b5-414c-a0aa-f06cb51353c7.png) | ![Edit](https://user-images.githubusercontent.com/56207146/190227623-ea66b91a-479b-458f-845c-336e945db8cf.png) |

### About page

The about page is in fact a *React Native* modal that displays everything you expect
from a traditionnal about section. I've added this repo's link.

![About](https://user-images.githubusercontent.com/56207146/190226342-1aff1118-94b4-44ec-8cc6-f4c3708ee2df.png)

## API

The API is nodeJS / ExpressJS / MongoDB based. 

It has only one model, which is "**TodosModel**":

```json
  {
    "title": ["string", "required"],
    "description": "string",
    "list": ["string", "required"],
    "fav": ["boolean", "default: false"],
    "imageName": "string",
    "author": ["string", "required"],
    "createdAt": ["Date", "required", "default: Date.now"],
  },
```

## Misc

### Project tree

```tree
📦 ROOT
├─ api
│  ├─ public
│  │  └─ images
│  │     └─ ...
│  ├─ src
│  │  ├─ config
│  │  │  ├─ db.config.js
│  │  │  └─ port.config.js
│  │  ├─ controllers
│  │  │  └─ todos.controller.js
│  │  ├─ middlewares
│  │  │  └─ manageImages.js
│  │  ├─ models
│  │  │  └─ todos.model.js
│  │  ├─ routes
│  │  │  ├─ index.js
│  │  │  └─ todos.routes.js
│  │  └─ utils
│  │     └─ consoleMessage.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ example.env
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ client
│  ├─ .expo-shared
│  │  └─ assets.json
│  ├─ public
│  │  ├─ fonts
│  │  │  └─ SpaceMono-Regular.ttf
│  │  └─ images
│  │     ├─ adaptive-icon.png
│  │     ├─ favicon.png
│  │     ├─ icon.png
│  │     └─ splash.png
│  ├─ src
│  │  ├─ components
│  │  │  ├─ __tests__
│  │  │  │  └─ StyledText-test.js
│  │  │  ├─ navigation
│  │  │  │  ├─ HeaderBarIcons.tsx
│  │  │  │  ├─ TabBarIcon.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ todoForm
│  │  │  │  ├─ CustomInput.tsx
│  │  │  │  ├─ Image.tsx
│  │  │  │  ├─ SelectInput.tsx
│  │  │  │  ├─ TodoForm.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ todoList
│  │  │  │  ├─ ListContainer.tsx
│  │  │  │  ├─ TodoCard.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ todoView
│  │  │  │  ├─ BackButton.tsx
│  │  │  │  ├─ ListDisplay.tsx
│  │  │  │  ├─ ViewContainer.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ AboutContent.tsx
│  │  │  ├─ EditScreenInfo.tsx
│  │  │  ├─ StyledText.tsx
│  │  │  ├─ Themed.tsx
│  │  │  └─ index.ts
│  │  ├─ config
│  │  │  ├─ api.ts
│  │  │  └─ index.ts
│  │  ├─ constants
│  │  │  ├─ Colors.ts
│  │  │  ├─ Layout.ts
│  │  │  └─ index.ts
│  │  ├─ hooks
│  │  │  ├─ index.ts
│  │  │  ├─ useCachedResources.ts
│  │  │  ├─ useColorScheme.ts
│  │  │  ├─ useDeleteTodo.ts
│  │  │  ├─ useFavorite.ts
│  │  │  ├─ useHomePage.ts
│  │  │  ├─ useImagePicker.ts
│  │  │  ├─ useThemeColor.ts
│  │  │  ├─ useToast.ts
│  │  │  ├─ useTodoForm.ts
│  │  │  ├─ useTodoList.ts
│  │  │  └─ useTodoScreen.ts
│  │  ├─ interfaces
│  │  │  ├─ Form.ts
│  │  │  ├─ Todo.ts
│  │  │  └─ index.ts
│  │  ├─ navigation
│  │  │  ├─ BottomTabNavigator.tsx
│  │  │  ├─ LinkingConfiguration.ts
│  │  │  ├─ Navigation.tsx
│  │  │  ├─ StackNavigator.tsx
│  │  │  └─ index.tsx
│  │  ├─ screens
│  │  │  ├─ HomeScreen.tsx
│  │  │  ├─ ModalAboutScreen.tsx
│  │  │  ├─ NotFoundScreen.tsx
│  │  │  ├─ TodoFormScreen.tsx
│  │  │  ├─ TodoListScreen.tsx
│  │  │  ├─ ViewTodoScreen.tsx
│  │  │  └─ index.ts
│  │  ├─ services
│  │  │  ├─ deleteTodo.ts
│  │  │  ├─ favoriteTodo.ts
│  │  │  ├─ getTodoByUserId.ts
│  │  │  ├─ getTodos.ts
│  │  │  ├─ index.ts
│  │  │  ├─ postTodo.ts
│  │  │  └─ putTodoById.ts
│  │  ├─ types
│  │  │  ├─ FormTypes.ts
│  │  │  ├─ FormikTypes.ts
│  │  │  ├─ RootTypes.ts
│  │  │  ├─ ThemedTypes.ts
│  │  │  ├─ TodoTypes.ts
│  │  │  └─ index.ts
│  │  ├─ utils
│  │  │  ├─ index.ts
│  │  │  ├─ normalizeDate.ts
│  │  │  └─ normalizeDescription.ts
│  │  └─ index.ts
│  ├─ .eslintignore
│  ├─ .eslintrc.json
│  ├─ .prettierrc.json
│  ├─ App.tsx
│  ├─ app.json
│  ├─ babel.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  └─ tsconfig.json
├─ .gitignore
├─ LICENSE
├─ README.md
├─ TS-React-Native-project.code-workspace
├─ package-lock.json
└─ package.json
```

### Dependencies

#### Root

```json
  "devDependencies": {
    "concurrently": "^7.4.0"
  }
```

#### Api

```json
  "dependencies": {
    "body-parser": "^1.19.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "mongoose": "^6.2.9",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.19"
  }
```

#### Client

```json
"dependencies": {
    "@expo/vector-icons": "^13.0.0",
    "@expo/webpack-config": "^0.17.0",
    "@react-navigation/bottom-tabs": "^6.0.5",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/native-stack": "^6.1.0",
    "@trivago/prettier-plugin-sort-imports": "^3.3.0",
    "expo": "~46.0.9",
    "expo-asset": "~8.6.1",
    "expo-constants": "~13.2.4",
    "expo-font": "~10.2.0",
    "expo-image-picker": "^13.3.1",
    "expo-linking": "~3.2.2",
    "expo-splash-screen": "~0.16.2",
    "expo-status-bar": "~1.4.0",
    "expo-system-ui": "~1.3.0",
    "expo-web-browser": "~11.0.0",
    "formik": "^2.2.9",
    "moment": "^2.29.4",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "react-native": "0.69.5",
    "react-native-picker-select": "^8.0.4",
    "react-native-root-toast": "^3.4.0",
    "react-native-safe-area-context": "4.3.1",
    "react-native-screens": "~3.15.0",
    "react-native-web": "~0.18.7",
    "yup": "^0.32.11"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@types/react": "~18.0.14",
    "@types/react-native": "~0.69.1",
    "@typescript-eslint/eslint-plugin": "^5.36.2",
    "eslint": "^8.23.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-prettier": "^8.5.0",
    "eslint-config-standard-with-typescript": "^22.0.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.6.1",
    "eslint-plugin-n": "^15.2.5",
    "eslint-plugin-promise": "^6.0.1",
    "eslint-plugin-react": "^7.31.7",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-native": "^4.0.0",
    "jest": "^26.6.3",
    "jest-expo": "~44.0.1",
    "prettier": "2.7.1",
    "react-test-renderer": "18.0.0",
    "typescript": "^4.8.2"
  },
```
