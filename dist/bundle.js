/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


const prjInput = new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
const activePrjList = new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
const finishedPrjList = new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');


/***/ }),

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Component
/* harmony export */ });
//Component Base Class
class Component {
    constructor(templateID, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateID);
        this.hostElement = document.getElementById(hostElementId);
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/*! namespace exports */
/*! export ProjectInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => /* binding */ ProjectInput
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//ProjectInput Class
class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_1__.default {
    //buttonInputElement:HTMLButtonElement;
    constructor() {
        super('project-input', 'app', true, "user-input");
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidate = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidate = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidate = {
            value: +enteredPeople,
            required: true,
            min: 0,
            max: 5
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_2__.validate(titleValidate) || !_util_validation__WEBPACK_IMPORTED_MODULE_2__.validate(descriptionValidate) || !_util_validation__WEBPACK_IMPORTED_MODULE_2__.validate(peopleValidate)) {
            alert("validation failed! try again");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            _state_project_state__WEBPACK_IMPORTED_MODULE_0__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_3__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/*! namespace exports */
/*! export ProjectItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => /* binding */ ProjectItem
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//ProjectItem Class
class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + '  assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/*! namespace exports */
/*! export ProjectList [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => /* binding */ ProjectList
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//ProjectList Class
class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.element.id = `${this.type}-projects`;
        this.configure();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_2__.ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.moveProject(prjId, this.type === "active" ? _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.addListener((projects) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_4__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_4__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_4__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind-decorator.ts":
/*!**********************************************!*\
  !*** ./src/decorators/autobind-decorator.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export autobind [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => /* binding */ autobind
/* harmony export */ });
//autobind Decarator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project-model.ts":
/*!*************************************!*\
  !*** ./src/models/project-model.ts ***!
  \*************************************/
/*! namespace exports */
/*! export Project [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ProjectStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => /* binding */ ProjectStatus,
/* harmony export */   "Project": () => /* binding */ Project
/* harmony export */ });
//Project Type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/*! namespace exports */
/*! export ProjectState [provided] [no usage info] [missing usage info prevents renaming] */
/*! export projectState [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => /* binding */ ProjectState,
/* harmony export */   "projectState": () => /* binding */ projectState
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateStateListener();
    }
    moveProject(projectID, newStatus) {
        const project = this.projects.find(prj => prj.id === projectID);
        if (project && project.status != newStatus) {
            project.status = newStatus;
            this.updateStateListener();
        }
    }
    updateStateListener() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/*! namespace exports */
/*! export validate [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => /* binding */ validate
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value == "string") {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value == "string") {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value == "number") {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value == "number") {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlc2NyaXB0LWNvdXJzZS8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2UvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWNvdXJzZS8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2UvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2UvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2UvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2UvLi9zcmMvbW9kZWxzL3Byb2plY3QtbW9kZWwudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2UvLi9zcmMvc3RhdGUvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWNvdXJzZS8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3R5cGVzY3JpcHQtY291cnNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1jb3Vyc2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWNvdXJzZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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Z0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtRQUMxRSxPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHO0tBQ3JFO0lBQ0QsSUFBRyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtRQUMxRSxPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHO0tBQ3JFO0lBQ0QsT0FBTyxPQUFPO0FBQ2xCLENBQUM7Ozs7Ozs7VUM1Qkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0JztcclxuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0JztcclxuXHJcblxyXG4gICAgXHJcbiAgICBcclxuICAgIGNvbnN0IHByaklucHV0ID0gbmV3IFByb2plY3RJbnB1dCgpO1xyXG4gICAgY29uc3QgYWN0aXZlUHJqTGlzdCA9IG5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XHJcbiAgICBjb25zdCBmaW5pc2hlZFByakxpc3QgPSBuZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7XHJcbiIsIlxyXG4gICAgLy9Db21wb25lbnQgQmFzZSBDbGFzc1xyXG4gICAgXHJcbiAgICBleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICAgICAgaG9zdEVsZW1lbnQ6IFQ7XHJcbiAgICAgICAgZWxlbWVudDogVTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlSUQ6IHN0cmluZywgaG9zdEVsZW1lbnRJZDogc3RyaW5nLCBpbnNlcnRBdFN0YXJ0OiBib29sZWFuLCBuZXdFbGVtZW50SWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlEKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5ob3N0RWxlbWVudCA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBpbXBvcnROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xyXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudElkKXtcclxuICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5pZCA9bmV3RWxlbWVudElkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydClcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIGF0dGFjaCAoaW5zZXJ0QXRCZWdpbm5pbmc6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoaW5zZXJ0QXRCZWdpbm5pbmcgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJywgdGhpcy5lbGVtZW50KVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xyXG4gICAgICAgIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiIsImltcG9ydCBDbXAgIGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5pbXBvcnQgKiBhcyBWYWxpZGF0aW9uIGZyb20gJy4uL3V0aWwvdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IGF1dG9iaW5kIGFzIEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3InO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlJ1xyXG5cclxuXHJcbiAgICAvL1Byb2plY3RJbnB1dCBDbGFzc1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENtcDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XHJcbiAgICBcclxuICAgICAgICB0aXRsZUlucHV0RWxlbWVudDpIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OkhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgcGVvcGxlSW5wdXRFbGVtZW50OkhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgLy9idXR0b25JbnB1dEVsZW1lbnQ6SFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsIHRydWUsIFwidXNlci1pbnB1dFwiKVxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpISBhcyBIVE1MSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykhIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Blb3BsZScpISBhcyBIVE1MSW5wdXRFbGVtZW50XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmVuZGVyQ29udGVudCgpIHt9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZFBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlVmFsaWRhdGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWluTGVuZ3RoOiA1LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICtlbnRlcmVkUGVvcGxlLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtaW46MCxcclxuICAgICAgICAgICAgICAgIG1heDo1XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZSh0aXRsZVZhbGlkYXRlKSB8fCAhVmFsaWRhdGlvbi52YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRlKSB8fCAhVmFsaWRhdGlvbi52YWxpZGF0ZShwZW9wbGVWYWxpZGF0ZSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcInZhbGlkYXRpb24gZmFpbGVkISB0cnkgYWdhaW5cIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQZW9wbGVdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgY2xlYXJJbnB1dHMoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIEBBdXRvYmluZFxyXG4gICAgICAgIHByaXZhdGUgc3VibWl0SGFuZGxlciAoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KClcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdXNlcklucHV0XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwgZGVzYywgcGVvcGxlKTtcclxuICAgICAgICAgICAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcklucHV0cygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICB9XHJcbiIsIlxyXG5cclxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3AtaW50ZXJmYWNlc1wiXHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdC1tb2RlbCdcclxuaW1wb3J0IENtcCBmcm9tICcuL2Jhc2UtY29tcG9uZW50J1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQtZGVjb3JhdG9yJ1xyXG4gXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy9Qcm9qZWN0SXRlbSBDbGFzc1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgUHJvamVjdEl0ZW0gZXh0ZW5kcyBDbXA8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnZ2FibGUge1xyXG4gICAgICAgIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcclxuICAgIFxyXG4gICAgICAgIGdldCBwZXJzb25zKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMSBwZXJzb25cIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnNgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgICAgICAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKVxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIEBhdXRvYmluZFxyXG4gICAgICAgIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCl7XHJcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XHJcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZD1cIm1vdmVcIjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBAYXV0b2JpbmRcclxuICAgICAgICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpe1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbmZpZ3VyZSgpe1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJlbmRlckNvbnRlbnQoKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbnMgKyAnICBhc3NpZ25lZCc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iLCJcclxuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wLWludGVyZmFjZXNcIlxyXG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QtbW9kZWwnXHJcbmltcG9ydCBDbXAgZnJvbSAnLi9iYXNlLWNvbXBvbmVudCdcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kLWRlY29yYXRvcidcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSdcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tICcuL3Byb2plY3QtaXRlbSdcclxuXHJcblxyXG5cclxuICAgIC8vUHJvamVjdExpc3QgQ2xhc3NcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ21wPEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0e1xyXG4gICAgXHJcbiAgICAgICAgYXNzaWduZWRQcm9qZWN0czogUHJvamVjdFtdO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCdwcm9qZWN0LWxpc3QnLCAnYXBwJywgZmFsc2UsYCR7dHlwZX0tcHJvamVjdHNgKTtcclxuICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107IFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuaWQgPWAke3RoaXMudHlwZX0tcHJvamVjdHNgO1xyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJzsgIFxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkLCBwcmpJdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgQGF1dG9iaW5kXHJcbiAgICAgICAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpe1xyXG4gICAgICAgICAgICBpZihldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSBcInRleHQvcGxhaW5cIikge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgICAgICAgICAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEBhdXRvYmluZFxyXG4gICAgICAgIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpe1xyXG4gICAgICAgICAgICBjb25zdCBwcmpJZCAgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgICAgICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QocHJqSWQsIHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIiA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgQGF1dG9iaW5kIFxyXG4gICAgICAgIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KXtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XHJcbiAgICAgICAgICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcik7XHJcbiAgICBcclxuICAgICAgICAgICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogUHJvamVjdFtdKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKHByaiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQgPSBsaXN0SWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgJyBQUk9KRUNUUydcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgfVxyXG4iLCIgXHJcbiAgICAgICAgLy9hdXRvYmluZCBEZWNhcmF0b3JcclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQoXzogYW55LCBfMjogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJvdW5kRm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICIsIiAgICAvL1Byb2plY3QgVHlwZVxyXG5cclxuXHJcbiAgICBleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtBY3RpdmUsIEZpbmlzaGVkfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgUHJvamVjdCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyB0aXRsZTogc3RyaW5nLCBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZywgcHVibGljIHBlb3BsZTogbnVtYmVyLCBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdC1tb2RlbCc7XHJcblxyXG5cclxuXHJcbiAgICAgXHJcbiAgICAgLy9Qcm9qZWN0IFN0YXRlIE1hbmFnZW1lbnQgXHJcbiAgICAgdHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xyXG4gICAgICAgIFxyXG4gICAgIGNsYXNzIFN0YXRlPFQ+IHtcclxuICAgICAgICAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xyXG4gICAgIFxyXG4gICAgICAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXN0ZW5lcjxUPikge1xyXG4gICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKVxyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG4gICAgIFxyXG4gICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgICAgICAgIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xyXG4gICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG4gICAgIFxyXG4gICAgICAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgICAgICBpZih0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgIH1cclxuICAgICBcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgIGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbnVtT2ZQZW9wbGU6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBudW1PZlBlb3BsZSwgUHJvamVjdFN0YXR1cy5BY3RpdmUgKTtcclxuICAgICAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgICB9XHJcbiAgICAgXHJcbiAgICAgICAgIG1vdmVQcm9qZWN0KHByb2plY3RJRDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQocHJqID0+IHByai5pZCA9PT0gcHJvamVjdElEKTtcclxuICAgICAgICAgICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9IG5ld1N0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgXHJcbiAgICAgICAgIHByaXZhdGUgdXBkYXRlU3RhdGVMaXN0ZW5lcigpIHtcclxuICAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgIGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuICAgICBcclxuICAgICBleHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKClcclxuICIsIiAgICAvL1ZhbGlkYXRpb25cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xyXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICAgICAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gICAgICAgIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICAgICAgICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgICAgICAgbWluPzogbnVtYmVyO1xyXG4gICAgICAgIG1heD86IG51bWJlcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XHJcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggIT1udWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPiB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAhPW51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHZhbGlkYXRhYmxlSW5wdXQubWluICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID4gdmFsaWRhdGFibGVJbnB1dC5taW5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPCB2YWxpZGF0YWJsZUlucHV0Lm1heFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNWYWxpZFxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9