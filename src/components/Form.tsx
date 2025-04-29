import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile"

interface FormProps {
    formData: {
      name: string;
      lastName: string;
      email: string;
      city: string;
      adress: string;
      post: string;
      phone: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        lastName: string;
        email: string;
        city: string;
        adress: string;
        post: string;
        phone: string;
    }>>;
    formError: {
        name: boolean;
        lastName: boolean;
        email: boolean;
        city: boolean;
        adress: boolean;
        post: boolean;
        phone: boolean;
    };
    emailFormatError: boolean
  }

export function Form({formData, setFormData, formError, emailFormatError}: FormProps) {
    const isMobile = useIsMobile();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      };

    return (
        <div className="w-100" style={{height: "max-content", padding: isMobile ? "10px" : "30px"}}>
            <h1>Vaši podaci: </h1>

            <div className="d-flex justify-content-between gap-2" style={{flexDirection: isMobile ? "column" : "row"}}>
                <div className="pt-2 pb-2" style={{width: isMobile ? "100%" : "50%"}}>
                    <h3 className="d-flex gap-1 align-items-end" style={{fontWeight: "350"}}>Ime: <span className="d-flex align-items-end" style={{color: "rgb(247, 43, 43)"}}>*</span> </h3>
                    <input 
                        type="text" 
                        placeholder="Ime" 
                        name="name"
                        id="firstName" 
                        className="w-100 p-1 pl-2 bg-white"
                        style={{height: "50px", fontSize: "1rem", border: "1px solid #dab684", fontWeight: "300"}}
                        onChange={handleChange}
                        value={formData.name}/>
                    {formError.name && <div style={{color: "rgb(247, 43, 43)"}}> Morate popuniti ovo polje! </div>}
                </div>

                <div className="pt-2 pb-2" style={{width: isMobile ? "100%" : "50%"}}>
                    <h3 className="d-flex gap-1" style={{fontWeight: "350"}}>Prezime: <span className="d-inline" style={{color: "rgb(247, 43, 43)"}}>*</span> </h3>
                    <input 
                        type="text" 
                        placeholder="Prezime" 
                        name="lastName"
                        id="lastName"
                        className="w-100 p-1 pl-2 fw-normal bg-white"
                        style={{height: "50px", fontSize: "1rem", border: "1px solid #dab684", fontWeight: "300"}}
                        onChange={handleChange}
                        value={formData.lastName}/>
                    {formError.lastName && <div style={{color: "rgb(247, 43, 43)"}}> Morate popuniti ovo polje! </div>}
                </div>
            </div>

            <div className="w-100 pt-2 pb-2">
                <h3 className="d-flex gap-1" style={{fontWeight: "350"}}>Email: <span className="d-inline" style={{color: "rgb(247, 43, 43)"}}>*</span> </h3>
                <input 
                    type="email" 
                    placeholder="E-adresa" 
                    name="email"
                    id="email"
                    className="w-100 p-1 pl-2"
                    style={{fontSize: "1rem", height: "50px", border: "1px solid #dab684", fontWeight: "300"}}
                    onChange={handleChange}
                    value={formData.email}/>
                {formError.email && <div style={{color: "rgb(247, 43, 43)"}}> Morate popuniti ovo polje! </div>}
                {emailFormatError ? <div id="emailFormatError" style={{color: "rgb(247, 43, 43)"}}> Pogrešan format emaila! </div> : null}
            </div>
            
            <div className="w-100 pt-2 pb-2">
                <h3 className="d-flex gap-1" style={{fontWeight: "350"}}>Grad: <span className="d-inline" style={{color: "rgb(247, 43, 43)"}}>*</span> </h3>
                <input 
                    type="text" 
                    id="city"
                    name="city"
                    className="w-100 p-1 pl-2"
                    style={{fontSize: "1rem", height: "50px", border: "1px solid #dab684", fontWeight: "300"}}
                    onChange={handleChange}
                    value={formData.city}/>
                {formError.city && <div style={{color: "rgb(247, 43, 43)"}}> Morate popuniti ovo polje! </div>}
            </div>

            <div className="w-100 pt-2 pb-2">
                <h3 className="d-flex gap-1" style={{fontWeight: "350"}}>Ulica i kućni broj: <span className="d-inline" style={{color: "rgb(247, 43, 43)"}}>*</span> </h3>
                <input 
                    type="text" 
                    id="adress"
                    name="adress"
                    className="w-100 p-1 pl-2"
                    style={{fontSize: "1rem", height: "50px", border: "1px solid #dab684", fontWeight: "300"}}
                    onChange={handleChange}
                    value={formData.adress}/>
                {formError.adress && <div style={{color: "rgb(247, 43, 43)"}}> Morate popuniti ovo polje! </div>}
            </div>
            
            <div className="w-100 pt-2 pb-2">
                <h3 className="d-flex gap-1" style={{fontWeight: "350"}}>Poštanski broj: </h3>
                <input 
                    type="text" 
                    id="posta"
                    name="post"
                    className="w-100 p-1 pl-2"
                    style={{fontSize: "1rem", height: "50px", border: "1px solid #dab684", fontWeight: "300"}}
                    onChange={handleChange}
                    value={formData.post}/>
            </div>

            <div className="w-100 pt-2 pb-2">
                <h3 className="d-flex gap-1" style={{fontWeight: "350"}}>Telefon: <span className="d-inline" style={{color: "rgb(247, 43, 43)"}}>*</span> </h3>
                <input 
                    type="tel" 
                    pattern="^06[0-9]{7,9}$" 
                    placeholder="Broj telefona" 
                    name="phone"
                    id="phone"
                    className="w-100 p-1 pl-2"
                    style={{fontSize: "1rem", height: "50px", border: "1px solid #dab684", fontWeight: "300"}}
                    onChange={handleChange}
                    value={formData.phone}/>
                {formError.phone && <div style={{color: "rgb(247, 43, 43)"}}> Morate popuniti ovo polje! </div>}
            </div>

            <h2 className="pt-2 pb-2 mt-2" style={{fontWeight: "400"}}> 
                Polja pored kojih stoji <div className="d-inline" style={{color: "rgb(247, 43, 43)"}}>*</div> moraju biti popunjena! 
            </h2>

        </div>
    )
}