"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Project Type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
function validate(validatableInput) {
    var isValid = true;
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
//autobind Decarator
function autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
//ProjectList Class
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        this.assignedProjects = [];
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = this.type + "-projects";
        projectState.addListener(function (projects) {
            _this.assignedProjects = projects;
            _this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            var listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl === null || listEl === void 0 ? void 0 : listEl.appendChild(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    };
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    };
    return ProjectList;
}());
//ProjectInput Class
var ProjectInput = /** @class */ (function () {
    //buttonInputElement:HTMLButtonElement;
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidate = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidate = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        var peopleValidate = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidate) || !validate(descriptionValidate) || !validate(peopleValidate)) {
            alert("validation failed! try again");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            console.log(title, desc, people);
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var prjInput = new ProjectInput();
var activePrjList = new ProjectList('active');
var finishedPrjList = new ProjectList('finished');
