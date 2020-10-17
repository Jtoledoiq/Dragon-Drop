"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Project Type
var App;
(function (App) {
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
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
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    var State = /** @class */ (function () {
        function State() {
            this.listeners = [];
        }
        State.prototype.addListener = function (listenerFn) {
            this.listeners.push(listenerFn);
        };
        return State;
    }());
    var ProjectState = /** @class */ (function (_super) {
        __extends(ProjectState, _super);
        function ProjectState() {
            var _this = _super.call(this) || this;
            _this.projects = [];
            return _this;
        }
        ProjectState.getInstance = function () {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        };
        ProjectState.prototype.addProject = function (title, description, numOfPeople) {
            var newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateStateListener();
        };
        ProjectState.prototype.moveProject = function (projectID, newStatus) {
            var project = this.projects.find(function (prj) { return prj.id === projectID; });
            if (project && project.status != newStatus) {
                project.status = newStatus;
                this.updateStateListener();
            }
        };
        ProjectState.prototype.updateStateListener = function () {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listenerFn = _a[_i];
                listenerFn(this.projects.slice());
            }
        };
        return ProjectState;
    }(State));
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
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
    App.autobind = autobind;
})(App || (App = {}));
var App;
(function (App) {
    //Component Base Class
    var Component = /** @class */ (function () {
        function Component(templateID, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateID);
            this.hostElement = document.getElementById(hostElementId);
            var importNode = document.importNode(this.templateElement.content, true);
            this.element = importNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        Component.prototype.attach = function (insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        };
        return Component;
    }());
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    //ProjectInput Class
    var ProjectInput = /** @class */ (function (_super) {
        __extends(ProjectInput, _super);
        //buttonInputElement:HTMLButtonElement;
        function ProjectInput() {
            var _this = _super.call(this, 'project-input', 'app', true, "user-input") || this;
            _this.titleInputElement = _this.element.querySelector('#title');
            _this.descriptionInputElement = _this.element.querySelector('#description');
            _this.peopleInputElement = _this.element.querySelector('#people');
            _this.configure();
            return _this;
        }
        ProjectInput.prototype.configure = function () {
            this.element.addEventListener('submit', this.submitHandler);
        };
        ProjectInput.prototype.renderContent = function () { };
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
                min: 0,
                max: 5
            };
            if (!App.validate(titleValidate) || !App.validate(descriptionValidate) || !App.validate(peopleValidate)) {
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
                App.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        };
        __decorate([
            App.autobind
        ], ProjectInput.prototype, "submitHandler", null);
        return ProjectInput;
    }(App.Component));
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
///<reference path ="base-component.ts"  />
var App;
(function (App) {
    //ProjectItem Class
    var ProjectItem = /** @class */ (function (_super) {
        __extends(ProjectItem, _super);
        function ProjectItem(hostId, project) {
            var _this = _super.call(this, 'single-project', hostId, false, project.id) || this;
            _this.project = project;
            _this.configure();
            _this.renderContent();
            return _this;
        }
        Object.defineProperty(ProjectItem.prototype, "persons", {
            get: function () {
                if (this.project.people === 1) {
                    return "1 person";
                }
                else {
                    return this.project.people + " persons";
                }
            },
            enumerable: false,
            configurable: true
        });
        ProjectItem.prototype.dragStartHandler = function (event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = "move";
        };
        ProjectItem.prototype.dragEndHandler = function (_) {
        };
        ProjectItem.prototype.configure = function () {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        };
        ProjectItem.prototype.renderContent = function () {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons + '  assigned';
            this.element.querySelector('p').textContent = this.project.description;
        };
        __decorate([
            App.autobind
        ], ProjectItem.prototype, "dragStartHandler", null);
        __decorate([
            App.autobind
        ], ProjectItem.prototype, "dragEndHandler", null);
        return ProjectItem;
    }(App.Component));
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
///<reference path ="base-component.ts"  />
var App;
(function (App) {
    //ProjectList Class
    var ProjectList = /** @class */ (function (_super) {
        __extends(ProjectList, _super);
        function ProjectList(type) {
            var _this = _super.call(this, 'project-list', 'app', false, type + "-projects") || this;
            _this.type = type;
            _this.assignedProjects = [];
            _this.element.id = _this.type + "-projects";
            _this.configure();
            _this.renderContent();
            return _this;
        }
        ProjectList.prototype.renderProjects = function () {
            var listEl = document.getElementById(this.type + "-projects-list");
            listEl.innerHTML = '';
            for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
                var prjItem = _a[_i];
                new App.ProjectItem(this.element.querySelector('ul').id, prjItem);
            }
        };
        ProjectList.prototype.dragOverHandler = function (event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                var listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        };
        ProjectList.prototype.dropHandler = function (event) {
            var prjId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(prjId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        };
        ProjectList.prototype.dragLeaveHandler = function (_) {
            var listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        };
        ProjectList.prototype.configure = function () {
            var _this = this;
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            App.projectState.addListener(function (projects) {
                _this.assignedProjects = projects.filter(function (prj) {
                    if (_this.type === "active") {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    return prj.status === App.ProjectStatus.Finished;
                });
                _this.renderProjects();
            });
        };
        ProjectList.prototype.renderContent = function () {
            var listId = this.type + "-projects-list";
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
        };
        __decorate([
            App.autobind
        ], ProjectList.prototype, "dragOverHandler", null);
        __decorate([
            App.autobind
        ], ProjectList.prototype, "dropHandler", null);
        __decorate([
            App.autobind
        ], ProjectList.prototype, "dragLeaveHandler", null);
        return ProjectList;
    }(App.Component));
    App.ProjectList = ProjectList;
})(App || (App = {}));
///<reference path ="models/drag-drop-interfaces.ts"  />
///<reference path ="models/project-model.ts"  />
///<reference path ="state/project-state.ts"  />
///<reference path ="util/validation.ts"  />
///<reference path ="autobind-decorator.ts"  />
///<reference path ="components/base-component.ts"  />
///<reference path ="components/project-input.ts"  />
///<reference path ="components/project-item.ts"  />
///<reference path ="components/project-list.ts"  />
var App;
(function (App) {
    //Project Type
    var prjInput = new App.ProjectInput();
    var activePrjList = new App.ProjectList('active');
    var finishedPrjList = new App.ProjectList('finished');
})(App || (App = {}));
