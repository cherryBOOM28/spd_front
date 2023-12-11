import cl from './Button.module.css'


function Button({children, className, onClick, ...props}) {
    return (
        <button onClick={onClick} {...props} className={cl.btn + " " + className}>{children}</button>
    );
}

export default Button;
