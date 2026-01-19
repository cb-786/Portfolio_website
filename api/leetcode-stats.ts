// Serverless endpoint to fetch LeetCode stats via GraphQL
// This proxies the request from backend to avoid CORS issues

export default async function handler(req: any, res: any) {
  try {
    const username = (req.query.username as string) || (req.body && (req.body.username as string)) || 'Chirag_bansal192005';
    
    const gqlUrl = 'https://leetcode.com/graphql';
    const query = `
      query fullUserData($username: String!) {
        matchedUser(username: $username) {
          profile { ranking }
          submitStats {
            acSubmissionNum { difficulty count }
          }
        }
        userContestRanking(username: $username) { rating }
      }
    `;
    
    const response = await fetch(gqlUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({ 
        query, 
        variables: { username } 
      })
    });

    if (!response.ok) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(response.status).json({ error: `LeetCode returned ${response.status}` });
    }

    const data = await response.json();

    if (data.errors) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(400).json({ error: 'GraphQL error', details: data.errors });
    }

    const submitStats = data?.data?.matchedUser?.submitStats?.acSubmissionNum || [];
    const contestRanking = data?.data?.userContestRanking || {};
    const profile = data?.data?.matchedUser?.profile || {};

    let easy = 0, medium = 0, hard = 0, total = 0;
    submitStats.forEach((stat: any) => {
      if (stat.difficulty === 'All') total = stat.count;
      if (stat.difficulty === 'Easy') easy = stat.count;
      if (stat.difficulty === 'Medium') medium = stat.count;
      if (stat.difficulty === 'Hard') hard = stat.count;
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json({
      totalSolved: total,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      ranking: profile.ranking || 0,
      ContestRating: Math.round(contestRanking.rating) || 0,
    });
  } catch (err: any) {
    try { res.setHeader('Access-Control-Allow-Origin', '*'); } catch (e) {}
    return res.status(500).json({ error: String(err?.message || err) });
  }
}
