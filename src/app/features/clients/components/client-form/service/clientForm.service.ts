import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class ClientFormService {
    constructor (private fb: FormBuilder){}

    createForm():FormGroup{
        return this.fb.group({
            id: [null],
            name: ['',Validators.required],
            lastname:['',Validators.required],
            email: ['',Validators.required]
        });
    }

    resetForm(form:FormGroup): void {
        form.reset({
            id: null,
            name: '',
            lastname: '',
            email: ''
        });
    }
}



