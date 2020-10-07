"use strict";
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.attach();
        console.log(importNode);
    }
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    return ProjectInput;
}());
var prjInput = new ProjectInput();
