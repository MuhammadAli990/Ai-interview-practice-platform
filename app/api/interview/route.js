import connectDB from "@/lib/db";
import Interview from "@/lib/models/interview";

export async function POST(req) {
    await connectDB();
    try {
        const { jobRole, jobDescription, jobExperience, jsonMockResp, createdBy } = await req.json();
        const newInterview = new Interview({
            jobPosition: jobRole, jobDescription, jobExperience, jsonMockResp, createdBy
        })
        await newInterview.save();
        return new Response(
            JSON.stringify({ message: "Interview created successfully.", id: newInterview._id }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    }
    catch (e) {
        console.log(e.message);
        return new Response(
            JSON.stringify({ message: "Error inserting data." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function GET(req) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id') || null;
        const email = searchParams.get('email') || null;
        let interview;
        if(id){
            interview = await Interview.findById(id);
        }
        else if(email){
            interview = await Interview.find({createdBy:email})
        }
        if (interview) {
            return new Response(
                JSON.stringify({ message: "Interview found.", interview }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
        else {
            return new Response(
                JSON.stringify({ message: "Interview not found." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }
    }
    catch (e) {
        console.log(e.message);
        return new Response(
            JSON.stringify({ message: "Error getting data." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}