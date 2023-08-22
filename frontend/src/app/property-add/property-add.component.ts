import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../property.model';
import { PropertyService } from '../property.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {
  propertyForm: FormGroup;

  username: string |any;
  password: string |any;
  usertype:string |any;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn


  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.propertyForm = this.formBuilder.group({

      owner: ['', Validators.required],
      rent: ['', Validators.required],
      contact: ['', Validators.required],
      area: ['', Validators.required],
      place: ['', Validators.required],
      amenities: [[]]
    });
  }

  onSubmit() {
    if (this.propertyForm.invalid) {
      return;
    }


    const property: Property = {
      id: '',
      status: 'Available',
      owner: this.propertyForm.value.owner,
      contact: this.propertyForm.value.contact,
      rent: this.propertyForm.value.rent,
      area: this.propertyForm.value.area,
      place: this.propertyForm.value.place,
      amenities: this.propertyForm.value.amenities
    };

    this.propertyService.createProperty(property).subscribe(
      (response: any) => {
          // set token received from server
          this.authService.setToken(response.token);
          localStorage.setItem('usertype', this.usertype); // store usertype in localStorage
          localStorage.setItem('password', this.password); // store usertype in localStorage
          localStorage.setItem('username', this.username); // store usertype in localStorage
          this._isLoggedIn = true; // modify the private backing field
          alert(` Your Property listed,Now its Available For Renters..!`);
        // Reset form or perform other actions as needed
      },
      (error: any) => {
        alert('Failed to add property..!!');
        // Handle error scenario
      }
    );
  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
