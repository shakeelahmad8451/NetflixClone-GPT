export const Validate = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);


    if (!isEmailValid) return 'Email is not Valid !!!';
    if (!isPasswordValid) return 'Password not Valid, must have Uppercase, Special Character, and Number';

    return null;
}
