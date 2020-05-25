# react-typescript-next-template

**version 0.0.1**

This is boilerplate code of website and is based on React Library and Next framework.
You can easily start your own react project with this boilerplate code!

<br>

## stack

- React Library (Rendering)
- Next Framework (Routing)
- Typescript (Javascript available)
- MobX (State control)

<br>

## guide

1. clone repository to your computer (https://github.com/pumpkin-raccoon/react-typescript-next-template.git)
2. type `npm install` in your terminal (assume you have npm. If not, download nodejs first)
3. type `npm run dev` to run this code in your desktop.
4. then go to `http://localhost:3000/` to see the output.
5. Done! you can start your own react project!


<br>

## features 

- include many **useful libraries** such as babel, webpack, react, etc.
- **well structured directories** (pages, public, static, layouts, interface, api, components, stores)
	- `pages` for the each page (_app, _document, _error page is default)
	- `public` contains `static` folder (font, images, reference, styles folder included)
	- `layouts` for the layout component (general layout included)
	- `interface` for the interface of page and objects
	- `api` for the attribute and queries (can be differentiated by db and query language)
	- `components` for components for react
	- `stores` for the store in global (several stores included)
- make style with **scss**
	- can change main color in `_var.scss`
	- custom default css (such as using `rem` not `px`, 1rem = 10px)
	- responsive! (write responsive code with typing `@import 'public/static/styles/utils.scss'` on the top of scss file) 
- nprogress module (which shows loading bar on top in the case of CSR)
- sidebar animation (in mobile size)
- custom font (appleSDGothic, Jalnan, NanumSquare)
- custom icon images included
- can easily control popup with Popup component and PopupStore

<br>

## examples

- custom index page

<br>

#### (1) index page

You can change index page in `pages/home/index.tsx`.
In mobile size, the sidebar(on the top right) change with animation.

<img src="https://react-typescript-next-template.s3.ap-northeast-2.amazonaws.com/main_mo_1.png" width="400" />

<img src="https://react-typescript-next-template.s3.ap-northeast-2.amazonaws.com/main_mo_2.png" width="400" />

<img src="https://react-typescript-next-template.s3.ap-northeast-2.amazonaws.com/main_pc_1.png" width="600" />

<br>

#### (2) error page

(...ing)


<br>

## Author
Pumpkin.Raccoon (Jaeha Lee)
