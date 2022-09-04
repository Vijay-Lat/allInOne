import {render,screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import HomePage from "./HomePage"


describe("Testing Home Page",()=>{
    beforeEach(()=>render(
    <BrowserRouter>
    <HomePage/>
    </BrowserRouter>
    ))

    test("renders home text",()=>{
        const homeTextElement = screen.getByLabelText(/home/i,{exact:false})
        expect(homeTextElement).toBeInTheDocument()
    })
})