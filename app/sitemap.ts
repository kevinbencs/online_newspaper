import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const resArt = await fetch('https://online-newspaper.vercel.app/api/article', { cache: 'no-store' });
    const dataArt: { art: { title: string, date: string, category: string }[] } = await resArt.json();

    const resCar = await fetch('https://online-newspaper.vercel.app/api/career', { cache: 'no-store' });
    const dataCar: { Car: { title: string, date: string }[] } = await resCar.json();

    const resAuth = await fetch('https://online-newspaper.vercel.app/api/authors', { cache: 'no-store' });
    const dataAuth: { res: { name: string}[] } = await resAuth.json();

    const resCategory = await fetch('https://online-newspaper.vercel.app/api/category', { cache: 'no-store' });
    const dataCategory: { success: { name: string, _id:string}[] } = await resCategory.json();

    const resSearch = await fetch('https://online-newspaper.vercel.app/api/search/sitemap', { cache: 'no-store' });
    const dataSearch: { res: { theme: string}[] } = await resSearch.json();

    const ResArray: {
      url: string,
      lastModified: string | Date | undefined,
      changeFrequency: "never" | "daily" | "always" | "hourly" | "weekly" | "monthly" | "yearly" | undefined,
      priority: number | undefined
    }[] = [];

    for (let item of dataCar.Car) {
      ResArray.push({
        url: `https://online-newspaper.vercel.app/carrier/${item.title.replaceAll(' ', '_')}`,
        lastModified: item.date,
        changeFrequency: 'never',
        priority: 0.8,
      })
    }

    for (let item of dataArt.art) {
      ResArray.push({
        url: `https://online-newspaper.vercel.app/${item.category}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_')}`,
        lastModified: item.date,
        changeFrequency: 'daily',
        priority: 1,
      })
    }

    for(let item of dataAuth.res){
      ResArray.push({
        url: `https://online-newspaper.vercel.app/authors/${item.name.replaceAll(' ','_')}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      })
    }

    for(let item of dataCategory.success){
      ResArray.push({
        url: `https://online-newspaper.vercel.app/category/${item.name.replaceAll(' ','').replaceAll('&','_').toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      })
    }

    for(let item of dataSearch.res){
      ResArray.push({
        url: `https://online-newspaper.vercel.app/search?text=${item.theme.replaceAll(' ','_')}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      })
    }



    return [
      {
        url: 'https://online-newspaper.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'always',
        priority: 1,
      },
      {
        url: 'https://online-newspaper.vercel.app/signin',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/signup',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/forgotpassword',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/privacypolicy',
        lastModified: '2024-12-01',
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: 'https://online-newspaper.vercel.app/newsletter',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/newsletter/unsubscribe',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/latest',
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: 'https://online-newspaper.vercel.app/important',
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: 'https://online-newspaper.vercel.app/authors',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: 'https://online-newspaper.vercel.app/career',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      ...ResArray
    ]


  } catch (error) {
    console.log(error)
    return [
      {
        url: 'https://online-newspaper.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'always',
        priority: 1,
      },
      {
        url: 'https://online-newspaper.vercel.app/signin',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/signup',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/forgotpassword',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/privacypolicy',
        lastModified: '2024-12-01',
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: 'https://online-newspaper.vercel.app/newsletter',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/newsletter/unsubscribe',
        lastModified: '2024-12-01',
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://online-newspaper.vercel.app/latest',
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: 'https://online-newspaper.vercel.app/important',
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: 'https://online-newspaper.vercel.app/authors',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: 'https://online-newspaper.vercel.app/career',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
    ]
  }

}