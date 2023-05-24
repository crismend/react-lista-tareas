import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import styled from "styled-components";

registerLocale('es', es);

const ContenedorInput = styled.div`
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background-image: linear-gradient(rgb(242, 243, 244), rgb(171, 178, 185));
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 2rem; /* 80px */
        width: 30rem;
        padding: 1.5rem; /* 20px */
        font-size: 1rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        &:hover {
            background-image: linear-gradient(rgb(194, 197, 200), rgb(149, 157, 165));
     } 
     @media(max-width: 60rem){ /* 950px */
    width: 15rem;
        padding: 1.2rem; /* 20px */
        font-size: 1rem;
    }
    }
`;

const DatePick = ({ fecha, setFecha }) => {

    const fechaActual = fecha;

    return (
        <ContenedorInput>
            <DatePicker
                className="datepick "
                selected={fechaActual}
                onChange={date => setFecha(date)}
                dateFormat=" dd 'de' MMMM 'de' yyyy "
                locale='es'
            />
        </ContenedorInput>

    );
}

export default DatePick;