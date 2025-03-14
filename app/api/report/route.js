import connectDB from "@/lib/db";
import Report from "@/lib/models/report";

export async function POST(req) {
    await connectDB();
    const { data,interviewId } = await req.json();
    try {
        const newReport = new Report({
            interview:interviewId,
            feedback:JSON.stringify(data.questions),
            totalRating:data.totalRating.toString(),
            status:data.status
        })
        await newReport.save();
        return new Response(
            JSON.stringify({ message: "IReport created successfully.", id: newReport._id }),
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
    try{
        await connectDB();
        const { searchParams } = new URL(req.url);
        const reportId = searchParams.get('id');
        const report = await Report.findById(reportId).populate('interview');
        if (report) {
            return new Response(
                JSON.stringify({ message: "Report found.", report }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
        else {
            return new Response(
                JSON.stringify({ message: "Report not found." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }
    }
    catch{

    }
}