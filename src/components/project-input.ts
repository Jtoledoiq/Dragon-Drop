import Cmp  from './base-component';
import * as Validation from '../util/validation';
import { autobind as Autobind } from '../decorators/autobind-decorator';
import { projectState } from '../state/project-state'


    //ProjectInput Class
    export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
    
        titleInputElement:HTMLInputElement;
        descriptionInputElement:HTMLInputElement;
        peopleInputElement:HTMLInputElement;
        //buttonInputElement:HTMLButtonElement;
    
    
    
        constructor() {
            super('project-input', 'app', true, "user-input")
            this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement
            this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement
            this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement
    
            this.configure()
    
        }
        configure() {
    
            this.element.addEventListener('submit', this.submitHandler);
            
        }
    
        renderContent() {}
    
        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
    
            const titleValidate: Validation.Validatable = {
                value: enteredTitle,
                required: true
            }
            const descriptionValidate: Validation.Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            }
            const peopleValidate: Validation.Validatable = {
                value: +enteredPeople,
                required: true,
                min:0,
                max:5
            }
    
            if (
                !Validation.validate(titleValidate) || !Validation.validate(descriptionValidate) || !Validation.validate(peopleValidate)
            ) {
                alert("validation failed! try again")
                return;
    
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
        }
    
    
        private clearInputs() {
        
            this.titleInputElement.value = ""
            this.descriptionInputElement.value = ""
            this.peopleInputElement.value = ""
        }
    
        @Autobind
        private submitHandler (event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput()
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput
                console.log(title, desc, people);
                projectState.addProject(title, desc, people);
                this.clearInputs()
            }
        }
    
    
    
    }
