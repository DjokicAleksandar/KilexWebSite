export function validateForm(formData: Record<string, string>) {
    let isValid = true;
    let emailFormatError = false;
    let phoneFormatError = false;
    const errors: Record<string, boolean> = {};

    for (let key in formData) {
        if (!formData[key]) {
            errors[key] = true;
            isValid = false;
        } else {
            errors[key] = false;
        }
    }

    // Email format provera
    if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            emailFormatError = true;
            isValid = false;
        }
    }

    // phone
    if (formData.phone) {
        const phonePattern = /^06[0-9]{7,9}$/;
        if (!phonePattern.test(formData.phone)) {
            phoneFormatError = true;
            isValid = false;
        }
    }

    return { isValid, errors, emailFormatError, phoneFormatError };
}