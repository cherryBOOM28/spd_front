import cl from './Button.module.css'


function Button({children, className, ...props}) {
    return (
        <button {...props} className={cl.btn + " " + className}>{children}</button>
    );
}

export default Button;
