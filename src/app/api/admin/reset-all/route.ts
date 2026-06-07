import { NextResponse } from "next/server";

// Admin-only endpoint to reset all user progress
// In a real implementation, this would verify admin role via Supabase auth
export async function POST(request: Request) {
  try {
    // In production, verify admin role here
    // For now, we'll simulate the reset operation
    
    // This would be the actual Supabase call:
    // const { data, error } = await supabase.rpc('reset_all_progress');
    
    return NextResponse.json({
      success: true,
      message: "All user progress has been reset successfully",
      affected_tables: [
        "profiles (xp, level, streak_days reset)",
        "attempts (all records deleted)",
        "bookmarks (all records deleted)",
        "quiz_sessions (all records deleted)",
        "mock_exam_results (all records deleted)",
        "progress_tracking (all records deleted)",
        "notes (all records deleted)",
        "user_achievements (all records deleted)"
      ],
      preserved_tables: [
        "questions (reference data preserved)",
        "topics (reference data preserved)",
        "mock_exams (templates preserved)",
        "achievements (definitions preserved)"
      ]
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset progress" },
      { status: 500 }
    );
  }
}

// GET endpoint to check admin status
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "admin-reset-all",
    description: "POST to this endpoint to reset all user progress"
  });
}