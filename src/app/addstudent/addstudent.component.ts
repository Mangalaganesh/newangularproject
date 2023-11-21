import { Component,ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { StudentService } from '../student.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent {

  options: string[] = ['ECE', 'EEE', 'MECH', 'CIVIL', 'CSE', 'EIE'];
  selectedOptions: string[] = [];

  myForm: FormGroup;
  studentdetailsForm: FormGroup;
  tab3: FormGroup;

  userFormData: any;
  selectedTabIndex = 0;
  
  studentdetailsFormData: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // @ViewChild("doc") fileInput: ElementRef | null = null;
  @ViewChild('doc') fileInput: ElementRef;

   fileToUpload: File | null = null;

   constructor(private fb: FormBuilder, public so: StudentService, private _snackBar: MatSnackBar, public route: Router) {

    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],

      // dob: ['', Validators.required],
      gender: ['', Validators.required],

      email: ['', Validators.required],
      phone: ['', Validators.required],
      courses: [''],
    });

    this.studentdetailsForm = this.fb.group({

      selectedOptions: [[], Validators.required],
      dob: ['', Validators.required],
    });
    this.tab3=this.fb.group({
      filerequired:[[],Validators.required]
    })
  }

  moveToNextTab1() {
    if (this.myForm.valid) {
      if (this.selectedTabIndex < 2) {
        this.selectedTabIndex++;

      }
    }
    this.userFormData = {
      firstName: this.myForm.get('firstName')?.value,
      lastName: this.myForm.get('lastName')?.value,
      address: this.myForm.get('address')?.value,
      phone: this.myForm.get('phone')?.value,
      // dob: this.myForm.get('dob')?.value,
      gender: this.myForm.get('gender')?.value,
      email: this.myForm.get('email')?.value
    };

    console.log("FORM 1: ", this.userFormData);

  }

  moveToPreviousTab() {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  moveToNextTab2() {
    if (this.studentdetailsForm.valid) {
      this.studentdetailsFormData = this.studentdetailsForm.value;
      

      this.selectedTabIndex++;
    }
    else {
      this.studentdetailsForm.markAllAsTouched();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
    }
  }

  submitform() {
    console.log("FORM 1: ", this.myForm.value);
    console.log("FORM 2: ", this.studentdetailsForm.value);
    // this.myForm.value.courses = this.studentdetailsForm.value.selectedOptions;
    // console.log("tab3", this.myForm.value)

    const formdata = new FormData();

    const dataToSend = {
      userInfo: this.myForm.value,
      academicInfo: this.studentdetailsForm.value,
     
    };

     console.log("userInfo", dataToSend.userInfo);
     console.log("academicInfo", dataToSend.academicInfo);
     formdata.append('dataToSend', JSON.stringify(dataToSend)); 

     if (this.fileToUpload) {      
      formdata.append('file', this.fileToUpload, this.fileToUpload.name);
      console.log(">>File>>>",formdata);
    }

    if (!this.fileToUpload) {
      console.log('No file selected');
      return;
    }

    // formdata.append('dataToSend', new Blob([JSON.stringify(dataToSend)], { type: 'application/json' }));
    
    console.log("DATA TO SEND :", dataToSend);

    console.log("FORM DATA", formdata);

    // this.so.addstudent(this.myForm.value).subscribe((data: any) => {
      this.so.addstudent(formdata).subscribe(response => {

        const statusCode = response.status;
  
        if (statusCode === 500) {
          alert("Internal Server error");
        } else {
         // alert(response.body);
  
          // console.log('Student registered:', response);
          console.log("return data", response);
      // this.openSnackBar();
          Swal.fire({
            title: 'Success!',
            text: 'Your data has been registered successfully...',
            icon: 'success',
          });
          this.route.navigate(['/viewstudent'])
        }
       
      });
      
    //   .subscribe((data: any) => {
    //   console.log("return data", data);
    //   this.openSnackBar();
    // })

  }

  openSnackBar() {
    this._snackBar.open('Added Successfully!!', 'ok', {
    });
    this.route.navigate(['/viewstudent'])
  }

  clear() {
    this.myForm.reset();
    
  }

  clearTab2() {
    this.studentdetailsForm.reset();
  }
  



}
