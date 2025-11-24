import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    // Test 1: Check connection by counting companies
    const { count, error: countError } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to connect to database',
        details: countError
      }, { status: 500 })
    }

    // Test 2: Get all companies
    const { data: companies, error: fetchError } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch companies',
        details: fetchError
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: '✅ Database connection successful!',
      stats: {
        total_companies: count,
        companies_fetched: companies.length
      },
      companies: companies
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error.message
    }, { status: 500 })
  }
}
