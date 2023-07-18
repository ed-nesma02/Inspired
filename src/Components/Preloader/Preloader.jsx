import { ThreeDots } from "react-loader-spinner";

const style = {
    display: 'flex',
    justifyContent: 'center',
    padding: '100px 0',
}

export const Preloader = ()=>(
    <div style={style}>
        <ThreeDots
            height="80" 
            width="80" 
            radius="9"
            color="#8A8A8A" 
        />
    </div>
)