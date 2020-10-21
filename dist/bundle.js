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
//Component Base Class
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
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
    exports.Component = Component;
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
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
    exports.validate = validate;
});
define("decorators/autobind-decorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
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
    exports.autobind = autobind;
});
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
define("state/project-state", ["require", "exports", "../models/project-model.js"], function (require, exports, project_model_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
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
            var newProject = new project_model_js_1.Project(Math.random().toString(), title, description, numOfPeople, project_model_js_1.ProjectStatus.Active);
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
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("components/project-input", ["require", "exports", "components/base-component", "util/validation", "decorators/autobind-decorator", "state/project-state"], function (require, exports, base_component_js_1, validation_js_1, autobind_decorator_js_1, project_state_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
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
            if (!validation_js_1.validate(titleValidate) || !validation_js_1.validate(descriptionValidate) || !validation_js_1.validate(peopleValidate)) {
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
                project_state_js_1.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        };
        __decorate([
            autobind_decorator_js_1.autobind
        ], ProjectInput.prototype, "submitHandler", null);
        return ProjectInput;
    }(base_component_js_1.Component));
    exports.ProjectInput = ProjectInput;
});
// Drag and Drop Interfaces
define("models/drag-drop-interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base-component", "decorators/autobind-decorator"], function (require, exports, base_component_js_2, autobind_decorator_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
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
            autobind_decorator_js_2.autobind
        ], ProjectItem.prototype, "dragStartHandler", null);
        __decorate([
            autobind_decorator_js_2.autobind
        ], ProjectItem.prototype, "dragEndHandler", null);
        return ProjectItem;
    }(base_component_js_2.Component));
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "../models/project-model.js", "components/base-component", "decorators/autobind-decorator", "state/project-state", "components/project-item"], function (require, exports, project_model_js_2, base_component_js_3, autobind_decorator_js_3, project_state_js_2, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
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
                new project_item_js_1.ProjectItem(this.element.querySelector('ul').id, prjItem);
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
            project_state_js_2.projectState.moveProject(prjId, this.type === "active" ? project_model_js_2.ProjectStatus.Active : project_model_js_2.ProjectStatus.Finished);
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
            project_state_js_2.projectState.addListener(function (projects) {
                _this.assignedProjects = projects.filter(function (prj) {
                    if (_this.type === "active") {
                        return prj.status === project_model_js_2.ProjectStatus.Active;
                    }
                    return prj.status === project_model_js_2.ProjectStatus.Finished;
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
            autobind_decorator_js_3.autobind
        ], ProjectList.prototype, "dragOverHandler", null);
        __decorate([
            autobind_decorator_js_3.autobind
        ], ProjectList.prototype, "dropHandler", null);
        __decorate([
            autobind_decorator_js_3.autobind
        ], ProjectList.prototype, "dragLeaveHandler", null);
        return ProjectList;
    }(base_component_js_3.Component));
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list"], function (require, exports, project_input_js_1, project_list_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var prjInput = new project_input_js_1.ProjectInput();
    var activePrjList = new project_list_js_1.ProjectList('active');
    var finishedPrjList = new project_list_js_1.ProjectList('finished');
});
