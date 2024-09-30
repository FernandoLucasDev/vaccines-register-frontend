export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email) ? true : false;
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    
    if (!password) {
      return false;
    }
    
    if (!regex.test(password)) {
      return false;
    }
  
    return true;
};

export const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
  
    if (cpf.length !== 11) {
      return 'CPF deve ter 11 dígitos';
    }

    const invalidCPFs = [
      '00000000000', '11111111111', '22222222222', '33333333333', 
      '44444444444', '55555555555', '66666666666', '77777777777', 
      '88888888888', '99999999999'
    ];
  
    if (invalidCPFs.includes(cpf)) {
      return false;
    }
  
    let sum;
    let remainder;
    
    sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  };